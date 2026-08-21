'use client';

import { useState, useEffect } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { sbMessaging } from '@/lib/api';
import { emailApi } from '@/lib/api/email';
import { useAuth } from '@/hooks/useAuth';
import {
  Megaphone, Plus, Send, Eye, Clock, Edit, Trash2, MoreVertical, X,
  Search, Filter, ChevronDown, Image as ImageIcon, FileText, Users,
  Bell, Calendar, AlertTriangle, Star, CheckCircle, SendHorizontal,
  BarChart3, TrendingUp, ArrowUpRight, Loader2, Pin, PinOff,
  MessageSquare, Share2, Copy, RefreshCw, Globe, GraduationCap,
  UserCheck, BookOpen, Mail, Smartphone, Settings, BellRing, MailOpen,
  CheckCheck, CalendarDays, List, BarChart, PieChart
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'urgent' | 'event' | 'important';
  audience: 'all' | 'parents' | 'teachers' | 'students' | 'class';
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
  engagement: number;
  attachments?: { name: string; type: string; url: string }[];
  targetClass?: string;
  createdBy: { name: string; avatar?: string };
}

const TYPE_CONFIG = {
  info: { icon: Info, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', label: 'Information' },
  urgent: { icon: AlertTriangle, color: 'red', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', label: 'Urgent' },
  event: { icon: Calendar, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', label: 'Événement' },
  important: { icon: Star, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', label: 'Important' },
};

const STATUS_CONFIG = {
  draft: { icon: Edit, color: 'slate', bg: 'bg-slate-100', text: 'text-slate-600', label: 'Brouillon' },
  published: { icon: CheckCircle, color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Publié' },
  scheduled: { icon: Clock, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600', label: 'Programmé' },
};

const AUDIENCE_CONFIG = {
  all: { icon: Globe, label: 'Tout le monde', color: 'indigo' },
  parents: { icon: Users, label: 'Parents', color: 'emerald' },
  teachers: { icon: GraduationCap, label: 'Enseignants', color: 'blue' },
  students: { icon: UserCheck, label: 'Élèves', color: 'purple' },
  class: { icon: BookOpen, label: 'Par classe', color: 'amber' },
};

function Info(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  );
}

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDigestModal, setShowDigestModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [creating, setCreating] = useState(false);
  const sending = false;
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Push notifications & Email digest settings
  const [notificationSettings, setNotificationSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    digestFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    digestDay: 'monday',
    digestTime: '08:00',
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
  });

  // Email digest data (no tracking tables available yet)
  const digestStats = {
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    unsubscribes: 0,
    byAudience: [] as { name: string; sent: number; opened: number; rate: number }[],
  };

  const recentDigests: { id: string; date: string; subject: string; sent: number; opened: number }[] = [];

  const [filters, setFilters] = useState({
    search: '',
    type: 'all' as string,
    audience: 'all' as string,
    status: 'all' as string,
  });

  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'info' as Announcement['type'],
    audience: 'all' as Announcement['audience'],
    targetClass: '',
    scheduledAt: '',
    attachFile: null as File | null,
  });

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadAnnouncements();
  }, [user]);

  const mapTargetRoleToAudience = (targetRole: string | null): Announcement['audience'] => {
    if (!targetRole) return 'all';
    switch (targetRole.toUpperCase()) {
      case 'PARENT': return 'parents';
      case 'TEACHER': return 'teachers';
      case 'STUDENT': return 'students';
      default: return 'all';
    }
  };

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await sbMessaging.getAnnouncements(user?.schoolId);
      const mapped: Announcement[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.message,
        type: 'info' as const,
        audience: mapTargetRoleToAudience(item.target_role),
        status: 'published' as const,
        publishedAt: item.created_at,
        createdAt: item.created_at,
        views: 0,
        engagement: 0,
        createdBy: { name: 'Administration' },
      }));
      setAnnouncements(mapped);
    } catch (err) {
      // Error handled by catch block
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast('Veuillez remplir le titre et le contenu', 'error');
      return;
    }
    setCreating(true);
    try {
      await sbMessaging.createAnnouncement({
        title: form.title,
        content: form.content,
        type: form.type,
        audience: form.audience,
        scheduledAt: form.scheduledAt || undefined,
      });
      showToast('Annonce créée avec succès', 'success');
      setShowCreate(false);
      resetForm();
      loadAnnouncements();
    } catch (err: any) {
      showToast(err.message || 'Erreur lors de la création', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleSendPushNotification = (announcement: Announcement) => {
    showToast(`Notifications push non disponibles pour le moment`, 'info');
  };

  const handleSendEmailDigest = async () => {
    try {
      const recentAnnouncements = announcements.slice(0, 5);
      const digestHtml = recentAnnouncements.map(a =>
        `<h3>${a.title}</h3><p>${a.content?.substring(0, 200)}...</p><hr/>`
      ).join('');
      await emailApi.sendBulk([{
        to: user?.email || '',
        subject: `Résumé des annonces - ${user?.school?.name || 'EduCI'}`,
        html: `<h2>Dernières annonces</h2>${digestHtml}`,
      }]);
      showToast('Résumé envoyé par email', 'success');
    } catch (err: any) {
      showToast(err.message || 'Erreur envoi email', 'error');
    }
    setShowDigestModal(false);
  };

  const handleSaveNotificationSettings = () => {
    showToast('Paramètres de notification sauvegardés', 'success');
    setShowSettingsModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) return;
    try {
      await sbMessaging.removeAnnouncement(id);
      showToast('Annonce supprimée', 'success');
      loadAnnouncements();
    } catch (err: any) {
      showToast(err.message || 'Erreur', 'error');
    }
  };

  const handleRepublish = (announcement: Announcement) => {
    showToast('Republication non disponible pour le moment', 'info');
  };

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      type: 'info',
      audience: 'all',
      targetClass: '',
      scheduledAt: '',
      attachFile: null,
    });
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = !filters.search || 
      a.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.content.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || a.type === filters.type;
    const matchesAudience = filters.audience === 'all' || a.audience === filters.audience;
    const matchesStatus = filters.status === 'all' || a.status === filters.status;
    return matchesSearch && matchesType && matchesAudience && matchesStatus;
  });

  const stats = {
    total: announcements.length,
    published: announcements.filter(a => a.status === 'published').length,
    scheduled: announcements.filter(a => a.status === 'scheduled').length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0),
    avgEngagement: Math.round(announcements.reduce((sum, a) => sum + a.engagement, 0) / (announcements.length || 1)),
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Administration' }, { label: 'Annonces' }]}>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Annonces</h1>
          <p className="text-sm text-slate-500 mt-1">Communication officielle de l'établissement</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDigestModal(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50"
          >
            <Mail size={18} />
            Résumé email
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50"
          >
            <Settings size={18} />
            Paramètres
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-indigo-600"
          >
            <Plus size={18} />
            Nouvelle annonce
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Total annonces</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <p className="text-xs text-emerald-600 font-medium">Publiées</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.published}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-600 font-medium">Programmées</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{stats.scheduled}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
          <p className="text-xs text-indigo-600 font-medium">Vues totales</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{stats.totalViews}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
        >
          <option value="all">Tous types</option>
          <option value="info">Information</option>
          <option value="urgent">Urgent</option>
          <option value="event">Événement</option>
          <option value="important">Important</option>
        </select>

        <select
          value={filters.audience}
          onChange={(e) => setFilters({ ...filters, audience: e.target.value })}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
        >
          <option value="all">Toutes audiences</option>
          <option value="all">Tout le monde</option>
          <option value="parents">Parents</option>
          <option value="teachers">Enseignants</option>
          <option value="students">Élèves</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
        >
          <option value="all">Tous statuts</option>
          <option value="published">Publiées</option>
          <option value="draft">Brouillons</option>
          <option value="scheduled">Programmées</option>
        </select>
      </div>

      {/* Announcements Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-500" />
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Megaphone size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Aucune annonce</h3>
          <p className="text-slate-500 mb-4">Créez votre première annonce pour commencer</p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium"
          >
            Créer une annonce
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnnouncements.map(announcement => {
            const typeConfig = TYPE_CONFIG[announcement.type];
            const statusConfig = STATUS_CONFIG[announcement.status];
            const audienceConfig = AUDIENCE_CONFIG[announcement.audience];
            const TypeIcon = typeConfig.icon;
            const StatusIcon = statusConfig.icon;
            const AudienceIcon = audienceConfig.icon;

            return (
              <div
                key={announcement.id}
                className={`bg-white rounded-2xl border-2 p-6 hover:shadow-lg transition-all cursor-pointer ${
                  announcement.type === 'urgent' ? 'border-red-200 hover:border-red-400' :
                  announcement.type === 'important' ? 'border-amber-200 hover:border-amber-400' :
                  'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => { setSelectedAnnouncement(announcement); setShowPreview(true); }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${typeConfig.bg} flex items-center justify-center`}>
                      <TypeIcon size={20} className={typeConfig.text} />
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
                        {typeConfig.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon size={12} className="inline mr-1" />
                      {statusConfig.label}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg"
                    >
                      <MoreVertical size={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">{announcement.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">{announcement.content}</p>

                {/* Audience */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 bg-${audienceConfig.color}-50 text-${audienceConfig.color}-600 rounded-lg text-xs font-medium flex items-center gap-1`}>
                    <AudienceIcon size={12} />
                    {audienceConfig.label}
                  </span>
                  {announcement.targetClass && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {announcement.targetClass}
                    </span>
                  )}
                </div>

                {/* Stats & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {announcement.views} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp size={14} /> {announcement.engagement}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => { setSelectedAnnouncement(announcement); setShowPreview(true); }}
                    className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => { setSelectedAnnouncement(announcement); setShowCreate(true); setForm({ ...form, title: announcement.title, content: announcement.content, type: announcement.type, audience: announcement.audience }); }}
                    className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="py-2 px-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Nouvelle annonce</h3>
              <button onClick={() => { setShowCreate(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Rentrée scolaire 2025-2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Contenu *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Rédigez votre annonce ici..."
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Type & Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as Announcement['type'] })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="info">Information</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Événement</option>
                    <option value="important">Important</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Audience</label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value as Announcement['audience'] })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="all">Tout le monde</option>
                    <option value="parents">Parents uniquement</option>
                    <option value="teachers">Enseignants uniquement</option>
                    <option value="students">Élèves uniquement</option>
                    <option value="class">Par classe</option>
                  </select>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Programmer (optionnel)</label>
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Pièces jointes</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                  <ImageIcon size={24} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">Glissez un fichier ou cliquez pour parcourir</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, images, documents</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={() => { setShowCreate(false); resetForm(); }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleCreate}
                disabled={creating}
                className="flex-1 py-2.5 bg-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-indigo-600 disabled:opacity-50"
              >
                {creating ? <Loader2 size={18} className="animate-spin" /> : <SendHorizontal size={18} />}
                {creating ? 'Création...' : 'Publier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 overflow-hidden">
            {/* Preview Header */}
            <div className={`px-6 py-4 border-b border-slate-200 ${
              selectedAnnouncement.type === 'urgent' ? 'bg-red-50' :
              selectedAnnouncement.type === 'important' ? 'bg-amber-50' :
              'bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const TypeIcon = TYPE_CONFIG[selectedAnnouncement.type].icon;
                    return <TypeIcon size={20} className={TYPE_CONFIG[selectedAnnouncement.type].text} />;
                  })()}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    TYPE_CONFIG[selectedAnnouncement.type].bg
                  } ${TYPE_CONFIG[selectedAnnouncement.type].text}`}>
                    {TYPE_CONFIG[selectedAnnouncement.type].label}
                  </span>
                </div>
                <button onClick={() => { setShowPreview(false); setSelectedAnnouncement(null); }} className="p-2 hover:bg-white rounded-lg">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedAnnouncement.title}</h2>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(selectedAnnouncement.publishedAt || selectedAnnouncement.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {AUDIENCE_CONFIG[selectedAnnouncement.audience].label}
                </span>
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-slate-700 whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{selectedAnnouncement.views}</p>
                  <p className="text-xs text-slate-500">Vues</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{selectedAnnouncement.engagement}%</p>
                  <p className="text-xs text-slate-500">Engagement</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">{selectedAnnouncement.createdBy.name}</p>
                  <p className="text-xs text-slate-500">Par</p>
                </div>
              </div>
            </div>

            {/* Preview Actions */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => handleSendPushNotification(selectedAnnouncement)}
                disabled={sending}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <BellRing size={16} />}
                Notification push
              </button>
              <button
                onClick={() => { showToast('Lien copié', 'success'); }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-200"
              >
                <Copy size={16} />
                Copier le lien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Digest Modal */}
      {showDigestModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Mail size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Résumé Email</h3>
                  <p className="text-sm text-slate-500">Envoyez un résumé des activités aux parents</p>
                </div>
              </div>
              <button onClick={() => setShowDigestModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Digest Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-xs text-blue-600 font-medium">Emails envoyés</p>
                <p className="text-2xl font-bold text-blue-700">{digestStats.totalSent}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-xs text-emerald-600 font-medium">Taux d'ouverture</p>
                <p className="text-2xl font-bold text-emerald-700">{digestStats.openRate}%</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl">
                <p className="text-xs text-amber-600 font-medium">Taux de clic</p>
                <p className="text-2xl font-bold text-amber-700">{digestStats.clickRate}%</p>
              </div>
            </div>

            {/* Audience Stats */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Par audience</h4>
              <div className="space-y-2">
                {digestStats.byAudience.map(aud => (
                  <div key={aud.name} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{aud.name}</p>
                      <p className="text-xs text-slate-500">{aud.sent} envoyés</p>
                    </div>
                    <div className="w-32">
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${aud.rate}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 w-16 text-right">{aud.rate}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Digests */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Derniers résumés</h4>
              <div className="space-y-2">
                {recentDigests.map(digest => (
                  <div key={digest.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MailOpen size={18} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{digest.subject}</p>
                        <p className="text-xs text-slate-500">{new Date(digest.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{digest.opened}/{digest.sent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => setShowDigestModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Fermer
              </button>
              <button onClick={handleSendEmailDigest} disabled={sending} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? 'Envoi...' : 'Envoyer maintenant'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Settings size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Paramètres</h3>
                  <p className="text-xs text-slate-500">Notifications push et email</p>
                </div>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Channel Toggles */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                <h4 className="text-sm font-semibold text-slate-700">Canaux de notification</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing size={18} className="text-slate-500" />
                    <span className="text-sm text-slate-600">Push notifications</span>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({ ...notificationSettings, pushEnabled: !notificationSettings.pushEnabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.pushEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notificationSettings.pushEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-slate-500" />
                    <span className="text-sm text-slate-600">Email digest</span>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({ ...notificationSettings, emailEnabled: !notificationSettings.emailEnabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.emailEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notificationSettings.emailEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-slate-500" />
                    <span className="text-sm text-slate-600">SMS</span>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({ ...notificationSettings, smsEnabled: !notificationSettings.smsEnabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.smsEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notificationSettings.smsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              {/* Digest Frequency */}
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Fréquence du résumé email</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'daily', label: 'Quotidien' },
                    { id: 'weekly', label: 'Hebdomadaire' },
                    { id: 'monthly', label: 'Mensuel' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setNotificationSettings({ ...notificationSettings, digestFrequency: opt.id as any })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        notificationSettings.digestFrequency === opt.id ? 'bg-indigo-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiet Hours */}
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-700">Heures silencieuses</h4>
                  <button
                    onClick={() => setNotificationSettings({ ...notificationSettings, quietHoursEnabled: !notificationSettings.quietHoursEnabled })}
                    className={`w-10 h-5 rounded-full transition-colors ${notificationSettings.quietHoursEnabled ? 'bg-indigo-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${notificationSettings.quietHoursEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                {notificationSettings.quietHoursEnabled && (
                  <div className="grid grid-cols-2 gap-2">
                    <input type="time" value={notificationSettings.quietHoursStart} onChange={(e) => setNotificationSettings({ ...notificationSettings, quietHoursStart: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm" />
                    <input type="time" value={notificationSettings.quietHoursEnd} onChange={(e) => setNotificationSettings({ ...notificationSettings, quietHoursEnd: e.target.value })} className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowSettingsModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                Annuler
              </button>
              <button onClick={handleSaveNotificationSettings} className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleLayout>
  );
}
