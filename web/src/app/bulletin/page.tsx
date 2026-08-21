'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { sbClasses, sbGrades } from '@/lib/api';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import {
  GraduationCap, Award, BarChart3, BookOpen, ChevronDown, ChevronLeft,
  CheckCircle, XCircle, AlertTriangle, Download, Printer, Share, Eye,
  FileText, FileSpreadsheet, Users, Loader2, RefreshCw, Search, Filter,
  Calendar, Settings, Mail, Send, Lock, Unlock, Check, X, Star,
  TrendingUp, TrendingDown, Minus, Sparkles, Edit, Plus
} from 'lucide-react';
import type { Period, StudentReport } from '@/types';

const MENTION_STYLES: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  'Excellent': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', emoji: '🏆' },
  'Très Bien': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', emoji: '🌟' },
  'Bien': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', emoji: '👏' },
  'Assez Bien': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', emoji: '📝' },
  'Passable': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', emoji: '📌' },
  'Insuffisant': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', emoji: '⚠️' },
};

function getMentionStyle(mention: string) {
  return MENTION_STYLES[mention] || MENTION_STYLES['Insuffisant'];
}

function getMention(avg: number): string {
  if (avg >= 16) return 'Excellent';
  if (avg >= 14) return 'Très Bien';
  if (avg >= 12) return 'Bien';
  if (avg >= 10) return 'Assez Bien';
  if (avg >= 8) return 'Passable';
  return 'Insuffisant';
}

function getGradeColor(score: number): string {
  if (score >= 16) return 'text-emerald-600';
  if (score >= 14) return 'text-green-600';
  if (score >= 12) return 'text-teal-600';
  if (score >= 10) return 'text-amber-600';
  return 'text-red-600';
}

function getRankSuffix(rank: number): string {
  if (rank === 1) return 'er';
  return 'ème';
}

interface BulletinPreviewData {
  studentName: string;
  matricule: string;
  className: string;
  periodName: string;
  academicYear: string;
  generalAverage: number;
  rank: number;
  classSize: number;
  mention: string;
  totalCoefficient: number;
  subjects: {
    name: string;
    coefficient: number;
    average: number;
  }[];
  classAverage: number;
  highestAverage: number;
  lowestAverage: number;
  teacherComment: string;
  directorComment: string;
  generatedAt: string;
}

export default function BulletinsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const exportBranding = useExportBranding();

  const [classes, setClasses] = useState<any[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [bulletinsLoading, setBulletinsLoading] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState<BulletinPreviewData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMention, setFilterMention] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'list' | 'generate' | 'history'>('list');
  const [selectedBulletins, setSelectedBulletins] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<any[]>([]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!user?.schoolId) return;
    async function load() {
      try {
        const [c, p] = await Promise.all([
          sbClasses.list(user!.schoolId),
          sbGrades.getPeriods(user!.schoolId),
        ]);
        setClasses(c);
        setPeriods(p);
        if (p.length > 0) {
          const active = p.find((per: Period) => per.isActive) || p[0];
          setSelectedPeriod(active.id);
        }
        const bulletinPromises: Promise<{ class: any; period: any; data: any[] }>[] = [];
        for (const cls of c) {
          for (const per of p) {
            bulletinPromises.push(
              sbGrades.getBulletins(cls.id, per.id)
                .then(data => ({ class: cls, period: per, data: data || [] }))
                .catch(() => ({ class: cls, period: per, data: [] }))
            );
          }
        }
        const results = await Promise.all(bulletinPromises);
        const historyItems: any[] = results
          .filter(r => r.data.length > 0)
          .map(r => ({
            class: r.class,
            period: r.period,
            count: r.data.length,
            status: r.data.some((b: any) => b.status === 'PUBLISHED') ? 'PUBLISHED' : 'DRAFT',
            created_at: (r.data[0] as any)?.generatedAt || (r.data[0] as any)?.created_at || new Date().toISOString(),
          }));
        historyItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setHistory(historyItems);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.schoolId]);

  useEffect(() => {
    if (selectedClass && selectedPeriod) {
      loadBulletins();
    }
  }, [selectedClass, selectedPeriod]);

  const loadBulletins = async () => {
    setBulletinsLoading(true);
    try {
      const data = await sbGrades.getBulletins(selectedClass, selectedPeriod);
      setBulletins(data || []);
    } catch (err) {
      setBulletins([]);
    } finally {
      setBulletinsLoading(false);
    }
  };

  const handleGenerateAll = async () => {
    if (!selectedClass || !selectedPeriod) return;
    setGenerating(true);
    try {
      await sbGrades.generateBulletins(selectedClass, selectedPeriod);
      await loadBulletins();
      showToast('Bulletins générés avec succès', 'success');
    } catch (err: any) {
      showToast(err.message || 'Erreur de génération', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateOne = async (studentId: string) => {
    try {
      await sbGrades.generateBulletins(selectedClass, selectedPeriod);
      showToast('Bulletin régénéré', 'success');
      await loadBulletins();
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    }
  };

  const openPreview = (bulletin: any) => {
    const averages = bulletins.map(b => b.generalAverage || 0).filter(a => a > 0);
    const classAvg = averages.length > 0 ? averages.reduce((s, v) => s + v, 0) / averages.length : 0;
    const highestAvg = averages.length > 0 ? Math.max(...averages) : 0;
    const lowestAvg = averages.length > 0 ? Math.min(...averages) : 0;

    const activePeriod = periods.find(p => p.id === selectedPeriod);
    const year = (activePeriod as any)?.academicYear || (activePeriod as any)?.academic_year || `${new Date().getFullYear()} — ${new Date().getFullYear() + 1}`;

    const previewData: BulletinPreviewData = {
      studentName: bulletin.student?.user?.name || '—',
      matricule: bulletin.student?.matricule || '—',
      className: bulletin.student?.class?.name || selectedClass,
      periodName: activePeriod?.name || '—',
      academicYear: year,
      generalAverage: bulletin.generalAverage || 0,
      rank: bulletin.rank || 0,
      classSize: bulletin.classSize || bulletins.length,
      mention: bulletin.mention || getMention(bulletin.generalAverage || 0),
      totalCoefficient: bulletin.totalCoefficient || 0,
      subjects: (bulletin.entries || []).map((e: any) => ({
        name: e.subjectName || e.subject?.name || '—',
        coefficient: e.coefficient || e.subject?.coefficient || 1,
        average: e.average || 0,
      })),
      classAverage: Math.round(classAvg * 100) / 100,
      highestAverage: Math.round(highestAvg * 100) / 100,
      lowestAverage: Math.round(lowestAvg * 100) / 100,
      teacherComment: bulletin.teacherComment || bulletin.teacher_comment || '',
      directorComment: bulletin.directorComment || bulletin.director_comment || '',
      generatedAt: bulletin.generatedAt || bulletin.generated_at || new Date().toISOString(),
    };
    setSelectedBulletin(previewData);
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    showToast('Génération du PDF...', 'info');
    try {
      const columns: ExportColumn[] = [
        { header: 'Élève', key: 'studentName', width: 24 },
        { header: 'Classe', key: 'className', width: 18 },
        { header: 'Moyenne', key: 'average', width: 12 },
        { header: 'Rang', key: 'rank', width: 8 },
        { header: 'Appréciation', key: 'appreciation', width: 20 },
        { header: 'Statut', key: 'status', width: 12 },
      ];
      const data = filteredBulletins.map((b: any) => ({
        studentName: b.student?.user?.name || b.studentName || '',
        className: b.class?.name || b.className || '',
        average: b.average ?? '',
        rank: b.rank ?? '',
        appreciation: b.appreciation || '',
        status: b.status || '',
      }));
      const currentPeriod = periods.find((p: any) => p.id === selectedPeriod);
      const yearLabel = currentPeriod?.academicYearId || new Date().getFullYear().toString();
      exportToFile(data, columns, `bulletins_${new Date().toISOString().split('T')[0]}`, 'pdf', { title: 'Bulletins Scolaires', subtitle: `${filteredBulletins.length} bulletins — ${yearLabel}` }, exportBranding);
      showToast('Bulletin exporté', 'success');
      setShowExport(false);
    } catch (err) {
      showToast('Erreur d\'export', 'error');
    }
  };

  const handleExportAll = async (format: 'pdf' | 'excel') => {
    showToast(`Export ${format.toUpperCase()} en cours...`, 'info');
    try {
      const columns: ExportColumn[] = [
        { header: 'Élève', key: 'studentName', width: 24 },
        { header: 'Classe', key: 'className', width: 18 },
        { header: 'Moyenne', key: 'average', width: 12 },
        { header: 'Rang', key: 'rank', width: 8 },
        { header: 'Appréciation', key: 'appreciation', width: 20 },
        { header: 'Statut', key: 'status', width: 12 },
      ];
      const data = filteredBulletins.map((b: any) => ({
        studentName: b.student?.user?.name || b.studentName || '',
        className: b.class?.name || b.className || '',
        average: b.average ?? '',
        rank: b.rank ?? '',
        appreciation: b.appreciation || '',
        status: b.status || '',
      }));
      exportToFile(data, columns, `bulletins_${new Date().toISOString().split('T')[0]}`, format, { title: 'Bulletins Scolaires', subtitle: `Classe: ${filteredBulletins[0]?.class?.name || ''} — Période: ${periods.find(p => p.id === selectedPeriod)?.name || ''}` }, exportBranding);
      showToast(`${format.toUpperCase()} exportés avec succès`, 'success');
      setShowExport(false);
    } catch (err) {
      showToast('Erreur d\'export', 'error');
    }
  };

  const handleSelectAll = () => {
    if (selectedBulletins.size === bulletins.length) {
      setSelectedBulletins(new Set());
    } else {
      setSelectedBulletins(new Set(bulletins.map(b => b.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSet = new Set(selectedBulletins);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedBulletins(newSet);
  };

  const filteredBulletins = bulletins.filter(b => {
    const matchesSearch = (b.student?.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.student?.matricule || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMention = filterMention === 'ALL' || (b.mention || getMention(b.generalAverage || 0)) === filterMention;
    return matchesSearch && matchesMention;
  });

  const stats = {
    total: bulletins.length,
    generated: bulletins.filter(b => b.status === 'PUBLISHED').length,
    drafts: bulletins.filter(b => b.status === 'DRAFT').length,
    classAverage: bulletins.length > 0 
      ? (bulletins.reduce((sum, b) => sum + (b.generalAverage || 0), 0) / bulletins.length).toFixed(2)
      : '0.00',
  };

  if (loading) {
    return (
      <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Bulletins' }]}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="animate-spin text-indigo-500" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Bulletins' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.type === 'success' && <Check size={16} />}
          {toast.type === 'error' && <X size={16} />}
          {toast.type === 'info' && <Loader2 size={16} className="animate-spin" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bulletins Scolaires</h1>
          <p className="text-sm text-slate-500 mt-1">Génération et gestion des bulletins de notes</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {selectedClass && selectedPeriod && (
            <>
              <button
                onClick={handleGenerateAll}
                disabled={generating}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50"
              >
                {generating ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                {generating ? 'Génération...' : 'Générer tous'}
              </button>
              <button
                onClick={() => setShowExport(true)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-600"
              >
                <Download size={16} />
                Exporter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap mb-6">
        <div className="relative">
          <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedClass}
            onChange={(e) => { setSelectedClass(e.target.value); setSelectedBulletins(new Set()); }}
            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 min-w-0 sm:min-w-[180px]"
          >
            <option value="">Sélectionner classe</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => { setSelectedPeriod(e.target.value); setSelectedBulletins(new Set()); }}
            className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-indigo-500 min-w-0 sm:min-w-[160px]"
          >
            <option value="">Période</option>
            {periods.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { id: 'list', label: 'Liste bulletins', icon: BookOpen },
          { id: 'generate', label: 'Génération', icon: RefreshCw },
          { id: 'history', label: 'Historique', icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== LIST TAB ==================== */}
      {activeTab === 'list' && (
        <>
          {!selectedClass || !selectedPeriod ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Sélectionnez une classe et une période</h3>
              <p className="text-slate-500">Choisissez une classe et une période pour afficher les bulletins.</p>
            </div>
          ) : bulletinsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium">Total bulletins</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-medium">Publiés</p>
                  <p className="text-2xl font-bold text-emerald-700">{stats.generated}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <p className="text-xs text-amber-600 font-medium">Brouillons</p>
                  <p className="text-2xl font-bold text-amber-700">{stats.drafts}</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                  <p className="text-xs text-indigo-600 font-medium">Moyenne classe</p>
                  <p className={`text-2xl font-bold ${getGradeColor(parseFloat(stats.classAverage))}`}>
                    {stats.classAverage}/20
                  </p>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un élève..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select
                  value={filterMention}
                  onChange={(e) => setFilterMention(e.target.value)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                >
                  <option value="ALL">Toutes mentions</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Très Bien">Très Bien</option>
                  <option value="Bien">Bien</option>
                  <option value="Assez Bien">Assez Bien</option>
                  <option value="Passable">Passable</option>
                  <option value="Insuffisant">Insuffisant</option>
                </select>
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200"
                >
                  {selectedBulletins.size === bulletins.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                </button>
              </div>

              {/* Bulletins Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBulletins.map((bulletin) => {
                  const mention = bulletin.mention || getMention(bulletin.generalAverage || 0);
                  const mentionStyle = getMentionStyle(mention);
                  return (
                    <div
                      key={bulletin.id}
                      className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedBulletins.has(bulletin.id) ? 'border-indigo-400' : 'border-slate-100 hover:border-slate-200'
                      }`}
                      onClick={() => openPreview(bulletin)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedBulletins.has(bulletin.id)}
                            onChange={(e) => { e.stopPropagation(); handleSelectOne(bulletin.id); }}
                            className="w-4 h-4 rounded border-slate-300"
                          />
                          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {(bulletin.student?.user?.name || 'N').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${mentionStyle.bg} ${mentionStyle.text}`}>
                          {mentionStyle.emoji} {mention}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-1">{bulletin.student?.user?.name || '—'}</h4>
                      <p className="text-xs text-slate-400 mb-3">{bulletin.student?.matricule || '—'}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-2xl font-black ${getGradeColor(bulletin.generalAverage || 0)}`}>
                            {(bulletin.generalAverage || 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-400">/20</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-600">
                            {bulletin.rank || '-'}{bulletin.rank ? getRankSuffix(bulletin.rank) : ''}
                          </p>
                          <p className="text-xs text-slate-400">/{bulletin.classSize || 0} élèves</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); openPreview(bulletin); }}
                          className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100"
                        >
                          <Eye size={14} className="inline mr-1" /> Voir
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleGenerateOne(bulletin.studentId); }}
                          className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                        >
                          <RefreshCw size={14} className="inline mr-1" /> Régénérer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredBulletins.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Aucun bulletin trouvé</p>
                  <p className="text-sm">Générez les bulletins pour cette classe</p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ==================== GENERATE TAB ==================== */}
      {activeTab === 'generate' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Génération des Bulletins</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Étape 1</h4>
              <p className="text-sm text-slate-500">Sélectionnez une classe et une période</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Calculator size={24} />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Étape 2</h4>
              <p className="text-sm text-slate-500">Cliquez sur "Générer tous" pour calculer les moyennes</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Printer size={24} />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Étape 3</h4>
              <p className="text-sm text-slate-500">Exportez ou imprimez les bulletins PDF</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleGenerateAll}
              disabled={generating || !selectedClass || !selectedPeriod}
              className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-600 disabled:opacity-50"
            >
              {generating ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
              {generating ? 'Génération en cours...' : 'Générer tous les bulletins'}
            </button>
          </div>
        </div>
      )}

      {/* ==================== HISTORY TAB ==================== */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Historique des générations</h3>
          <div className="space-y-4">
            {history.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <FileText size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Aucune génération effectuée</p>
              </div>
            )}
            {history.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                    <FileText size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.period?.name || 'Période'} — {item.class?.name || 'Classe'}</p>
                    <p className="text-sm text-slate-400">{item.count || 0} bulletins • {new Date(item.created_at || item.generatedAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Exporter les bulletins</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => handleExportAll('pdf')}
                className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-4"
              >
                <div className="p-3 bg-red-500 text-white rounded-lg"><FileText size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export PDF</p>
                  <p className="text-xs text-slate-500">{selectedBulletins.size || bulletins.length} bulletins haute qualité</p>
                </div>
              </button>
              <button
                onClick={() => handleExportAll('excel')}
                className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-4"
              >
                <div className="p-3 bg-emerald-500 text-white rounded-lg"><FileSpreadsheet size={24} /></div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Export Excel</p>
                  <p className="text-xs text-slate-500">Tableur avec toutes les données</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulletin Preview Modal */}
      {showPreview && selectedBulletin && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-4" ref={printRef}>
            {/* Premium Bulletin Design */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden print:rounded-none print:shadow-none">
              {/* Header */}
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-8 pt-10 pb-14 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                        <GraduationCap size={28} className="text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold tracking-tight">{user?.school?.name || 'Établissement'}</h1>
                        <p className="text-indigo-200 text-xs font-medium">Bulletin Scolaire Officiel</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">Année scolaire</p>
                      <p className="text-white font-bold">{selectedBulletin.academicYear}</p>
                    </div>
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-bold shadow-2xl">
                      {selectedBulletin.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 pb-1">
                      <h2 className="text-2xl font-bold tracking-tight">{selectedBulletin.studentName}</h2>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span className="text-indigo-200 text-sm">
                          <span className="font-medium text-white">{selectedBulletin.className}</span>
                        </span>
                        <span className="text-indigo-300">•</span>
                        <span className="text-indigo-200 text-sm">Mat. {selectedBulletin.matricule}</span>
                      </div>
                    </div>
                    <div className="text-right pb-1">
                      <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider mb-1">Période</p>
                      <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                        {selectedBulletin.periodName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Average Hero */}
              <div className="relative px-8 -mt-7 z-10">
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center border-4 border-indigo-100">
                          <div className="text-center">
                            <span className="text-4xl font-black text-indigo-700 leading-none">
                              {selectedBulletin.generalAverage.toFixed(2)}
                            </span>
                            <span className="block text-xs font-bold text-indigo-400 mt-0.5">/ 20</span>
                          </div>
                        </div>
                        {selectedBulletin.generalAverage >= 10 && (
                          <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                            <Star size={16} className="text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${getMentionStyle(selectedBulletin.mention).bg} ${getMentionStyle(selectedBulletin.mention).text} ${getMentionStyle(selectedBulletin.mention).border}`}>
                          {getMentionStyle(selectedBulletin.mention).emoji} {selectedBulletin.mention}
                        </span>
                        <p className="text-slate-400 text-sm mt-2">
                          {selectedBulletin.generalAverage >= 16 ? 'Excellent travail. Félicitations !' :
                           selectedBulletin.generalAverage >= 14 ? 'Très bon travail. Continuez ainsi !' :
                           selectedBulletin.generalAverage >= 12 ? 'Bon travail dans l\'ensemble.' :
                           selectedBulletin.generalAverage >= 10 ? 'Résultats satisfaisants.' : 'Des efforts sont nécessaires.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {selectedBulletin.rank > 0 && (
                        <div className="text-center">
                          <div className="flex items-baseline gap-0.5 justify-center">
                            <span className="text-4xl font-black text-slate-800">{selectedBulletin.rank}</span>
                            <span className="text-lg font-bold text-slate-400">{getRankSuffix(selectedBulletin.rank)}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-400 mt-0.5">sur {selectedBulletin.classSize} élèves</p>
                        </div>
                      )}
                      <div className="h-16 w-px bg-slate-100" />
                      <div className="flex flex-col gap-3">
                        <div className="text-center px-4 py-2 bg-slate-50 rounded-xl">
                          <p className="text-xs font-semibold text-slate-400">Coeff. total</p>
                          <p className="text-lg font-bold text-slate-700">{selectedBulletin.totalCoefficient}</p>
                        </div>
                        <div className="text-center px-4 py-2 bg-slate-50 rounded-xl">
                          <p className="text-xs font-semibold text-slate-400">Matières</p>
                          <p className="text-lg font-bold text-slate-700">{selectedBulletin.subjects.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="px-8 mt-6 pb-8">
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/80">
                        <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Matière</th>
                        <th className="text-center px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Coeff.</th>
                        <th className="text-center px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Moyenne</th>
                        <th className="text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Appréciation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {selectedBulletin.subjects.map((subject, i) => {
                        const avgScore = subject.average;
                        const barWidth = Math.min((avgScore / 20) * 100, 100);
                        return (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                                  avgScore >= 14 ? 'bg-emerald-50 text-emerald-600' :
                                  avgScore >= 10 ? 'bg-amber-50 text-amber-600' :
                                  'bg-red-50 text-red-500'
                                }`}>
                                  {subject.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-slate-800 text-[15px]">{subject.name}</span>
                              </div>
                            </td>
                            <td className="text-center px-4 py-4">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                                {subject.coefficient}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      avgScore >= 14 ? 'bg-emerald-400' :
                                      avgScore >= 10 ? 'bg-amber-400' :
                                      'bg-red-400'
                                    }`}
                                    style={{ width: `${barWidth}%` }}
                                  />
                                </div>
                                <span className={`text-lg font-bold tabular-nums min-w-[4rem] text-right ${
                                  avgScore >= 14 ? 'text-emerald-600' :
                                  avgScore >= 10 ? 'text-amber-600' :
                                  'text-red-500'
                                }`}>
                                  {avgScore.toFixed(2)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                avgScore >= 14 ? 'bg-emerald-50 text-emerald-600' :
                                avgScore >= 10 ? 'bg-amber-50 text-amber-600' :
                                'bg-red-50 text-red-500'
                              }`}>
                                {avgScore >= 16 ? 'Excellent' :
                                 avgScore >= 14 ? 'Très bien' :
                                 avgScore >= 12 ? 'Bien' :
                                 avgScore >= 10 ? 'Satisfaisant' : 'Insuffisant'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="px-8 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Moyenne classe</p>
                    <p className="text-2xl font-bold text-slate-700 mt-1">{selectedBulletin.classAverage.toFixed(2)}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-emerald-600 uppercase">Plus haute</p>
                    <p className="text-2xl font-bold text-emerald-700 mt-1">{selectedBulletin.highestAverage.toFixed(2)}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-red-600 uppercase">Plus basse</p>
                    <p className="text-2xl font-bold text-red-700 mt-1">{selectedBulletin.lowestAverage.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="px-8 pb-6">
                <div className="rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/30 border border-slate-100 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-indigo-500" />
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Appréciation du professeur</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium italic">
                    &ldquo;{selectedBulletin.teacherComment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Signatures */}
              <div className="px-8 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-t-2 border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Signature du professeur</p>
                    <div className="h-16 mt-2" />
                  </div>
                  <div className="border-t-2 border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Signature du directeur</p>
                    <div className="h-16 mt-2" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} />
                    <span className="font-semibold">EduCI</span>
                    <span>— Bulletin généré automatiquement</span>
                  </div>
                  <span>{new Date(selectedBulletin.generatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex justify-center gap-4 mt-6 mb-5 print:hidden">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50"
              >
                Fermer
              </button>
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-600"
              >
                <Printer size={18} />
                Imprimer
              </button>
              <button
                onClick={handleExportPDF}
                className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-600"
              >
                <Download size={18} />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}

function Calculator({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2"/>
      <line x1="8" x2="16" y1="6" y2="6"/>
      <line x1="16" x2="16" y1="14" y2="18"/>
      <path d="M16 10h.01"/>
      <path d="M12 10h.01"/>
      <path d="M8 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M8 14h.01"/>
      <path d="M12 18h.01"/>
      <path d="M8 18h.01"/>
    </svg>
  );
}
