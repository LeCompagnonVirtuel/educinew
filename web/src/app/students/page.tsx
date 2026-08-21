'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { api, sbStudents, sbClasses } from '@/lib/api';
import { getSupabase } from '@/lib/api/shared';
import { sbEmailTrigger } from '@/lib/api/domains/email-trigger.service';
import { useAuth } from '@/hooks/useAuth';
import { exportToFile, type ExportColumn } from '@/lib/export-utils';
import { useExportBranding } from '@/hooks/useExportBranding';
import Pagination from '@/components/ui/Pagination';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  Users, TrendingUp, AlertTriangle, GraduationCap, Search,
  Filter, Download, Plus, Eye, Edit, Trash2, X, Check,
  FileText, BarChart3, Calendar, MessageSquare, CreditCard,
  UserPlus, UserCheck, UsersRound, Phone, Mail, Home, ArrowRight,
  CalendarCheck, QrCode, Shield, Clock, AlertCircle, Loader2,
  ChevronDown, ChevronRight, MapPin, FileUser, Upload, XCircle,
  CheckCircle2, UserX, UserCog, ArrowLeftRight, RefreshCw,
  Calendar as CalendarIcon, Bell, Send, MessageCircle, Edit2,
  Trash, Copy, EyeOff, FilterX, DownloadCloud, UploadCloud, FileSpreadsheet
} from 'lucide-react';

interface Guardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  address?: string;
  profession?: string;
  isEmergencyContact: boolean;
  studentId: string;
}


export default function StudentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const exportBranding = useExportBranding();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    classId: searchParams.get('classId') || '',
    gender: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 25;

  const [showCreate, setShowCreate] = useState(false);
  const [showPreview, setShowPreview] = useState<any>(null);
  const [showEdit, setShowEdit] = useState<any>(null);
  const [showDelete, setShowDelete] = useState<any>(null);
  const [showImport, setShowImport] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showGuardian, setShowGuardian] = useState<any>(null);
  const [showTransfer, setShowTransfer] = useState<any>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    matricule: '', 
    classId: '', 
    phone: '', 
    gender: '', 
    dateOfBirth: '', 
    address: '',
    importFile: null as File | null,
    exportFormat: 'excel' as 'excel' | 'pdf'
  });

  const [guardianForm, setGuardianForm] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: 'father' as Guardian['relationship'],
    address: '',
    profession: '',
    isEmergencyContact: true
  });

  const [transferForm, setTransferForm] = useState({
    fromClassId: '',
    toClassId: '',
    transferDate: '',
    reason: ''
  });

  const [showProgress, setShowProgress] = useState(false);
  const [progressTitle, setProgressTitle] = useState('');
  const [progressMessage, setProgressMessage] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [importCredentials, setImportCredentials] = useState<any[]>([]);

  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    byClass: [] as any[],
    byGender: [] as any[],
    monthlyEnrollments: [] as any[]
  });

  const [guardianList, setGuardianList] = useState<Guardian[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadStudents = async () => {
    if (!user?.schoolId) return;
    setLoading(true);
    try {
      const [paginatedResult, classesData] = await Promise.all([
        sbStudents.listPaginated(user.schoolId, (currentPage - 1), PAGE_SIZE),
        sbClasses.list(user.schoolId).catch(() => []),
      ]);

      const allStudents = paginatedResult.data || [];
      setStudents(allStudents);
      setTotalCount(paginatedResult.count);

      // Compute analytics from current page (lightweight summary)
      const classCounts: Record<string, { name: string; count: number }> = {};
      let maleCount = 0;
      let femaleCount = 0;
      const enrollmentsByMonth: Record<string, number> = {};

      allStudents.forEach((s: any) => {
        const className = s.class?.name || 'Non assigné';
        const classId = s.classId || 'none';
        if (!classCounts[classId]) classCounts[classId] = { name: className, count: 0 };
        classCounts[classId].count++;

        if (s.gender === 'M') maleCount++;
        else if (s.gender === 'F') femaleCount++;

        if (s.created_at || s.createdAt) {
          const d = new Date(s.created_at || s.createdAt);
          const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          enrollmentsByMonth[monthKey] = (enrollmentsByMonth[monthKey] || 0) + 1;
        }
      });

      const totalGender = maleCount + femaleCount || 1;
      const byGender = [];
      if (maleCount > 0 || femaleCount > 0) {
        byGender.push({ label: 'Garçons', value: maleCount, percentage: Math.round((maleCount / totalGender) * 100) });
        byGender.push({ label: 'Filles', value: femaleCount, percentage: Math.round((femaleCount / totalGender) * 100) });
      }

      const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const monthlyEnrollments = Object.entries(enrollmentsByMonth)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 4)
        .map(([key, count]) => {
          const month = parseInt(key.split('-')[1]) - 1;
          return { month: monthNames[month], count };
        });

      setAnalytics({
        totalStudents: paginatedResult.count,
        byClass: Object.values(classCounts).sort((a, b) => b.count - a.count),
        byGender,
        monthlyEnrollments
      });
      setClassesList(Array.isArray(classesData) ? classesData : []);
    } catch (e: any) {
      setStudents([]);
      setTotalCount(0);
      setAnalytics({ totalStudents: 0, byClass: [] as any[], byGender: [] as any[], monthlyEnrollments: [] as any[] });
      showToast(e.message || 'Erreur lors du chargement des élèves', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getClassesList = () => classesList;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  useEffect(() => {
    if (user?.schoolId) loadStudents();
  }, [user?.schoolId, search, filters, currentPage]);

  const filtered = students.filter((s) => {
    if (search && !(
      s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.matricule?.toLowerCase().includes(search.toLowerCase())
    )) return false;
    if (filters.classId === 'none' && s.classId) return false;
    if (filters.classId && filters.classId !== 'none' && s.classId !== filters.classId) return false;
    if (filters.gender && s.gender !== filters.gender) return false;
    if (filters.status && s.status !== filters.status) return false;
    if (filters.dateFrom) {
      const created = s.created_at || s.createdAt;
      if (!created || new Date(created) < new Date(filters.dateFrom)) return false;
    }
    if (filters.dateTo) {
      const created = s.created_at || s.createdAt;
      if (!created || new Date(created) > new Date(filters.dateTo)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const paginatedStudents = filtered;

  const handleCreate = async () => {
    if (!form.name || form.name.trim().length < 2) {
      showToast('Le nom doit contenir au moins 2 caractères', 'error');
      return;
    }
    if (!form.classId) {
      showToast('Veuillez sélectionner une classe pour l\'élève', 'error');
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast('Email invalide', 'error');
      return;
    }
    if (form.phone && !/^[\d\s+()-]{8,15}$/.test(form.phone)) {
      showToast('Numéro de téléphone invalide', 'error');
      return;
    }
    if (form.dateOfBirth) {
      const dob = new Date(form.dateOfBirth);
      if (isNaN(dob.getTime()) || dob > new Date()) {
        showToast('Date de naissance invalide', 'error');
        return;
      }
    }
    setActionLoading(true);
    try {
      const result = await api.createStudent({
        name: form.name,
        email: form.email || undefined,
        classId: form.classId || undefined,
        phone: form.phone || undefined,
        gender: form.gender || undefined,
        dateOfBirth: form.dateOfBirth || undefined,
        address: form.address || undefined,
        schoolId: user?.schoolId,
      });

      const creds = (result as any)?.credentials;
      if (creds) {
        showToast(`Élève créé ! Matricule: ${creds.matricule} — Mot de passe: ${creds.tempPassword}`, 'success');
        setImportCredentials(prev => [...prev, { name: form.name, matricule: creds.matricule, email: creds.email, password: creds.tempPassword }]);
      } else {
        showToast('Élève ajouté avec succès');
      }

      setShowCreate(false);
      setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' });
      loadStudents();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleEdit = async () => {
    if (!showEdit) return;
    setActionLoading(true);
    try {
      await api.updateStudent(showEdit.id, {
        matricule: form.matricule || undefined,
        classId: form.classId || undefined,
        phone: form.phone,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        address: form.address,
      });
      showToast('Élève modifié avec succès');
      setShowEdit(null);
      loadStudents();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    if (!showDelete) return;
    setActionLoading(true);
    try {
      await api.deleteStudent(showDelete.id);
      showToast('Élève supprimé avec succès');
      setShowDelete(null);
      loadStudents();
    } catch (e: any) { showToast(e.message, 'error'); }
    finally { setActionLoading(false); }
  };

  const handleImport = async () => {
    if (!form.importFile) {
      showToast('Veuillez sélectionner un fichier', 'error');
      return;
    }

    setActionLoading(true);
    setShowProgress(true);
    setProgressTitle('Validation du fichier');
    setProgressMessage('Analyse du contenu en cours...');
    setProgressPercent(10);

    try {
      const validation = await api.validateImportFile(form.importFile);
      setProgressPercent(40);
      setProgressMessage('Validation terminée. Import en cours...');

      const validRows = (validation.rows || validation).filter((r: any) => r.valid !== false);
      if (validRows.length === 0) {
        showToast('Aucune ligne valide dans le fichier.', 'error');
        setShowProgress(false);
        return;
      }

      setProgressPercent(60);
      setProgressMessage('Création des élèves et comptes parents...');

      const result = await api.confirmImport(validRows);
      setProgressPercent(100);
      setProgressMessage('Import terminé avec succès !');

      showToast(`Import réussi : ${result.studentsCreated || validRows.length} élèves et ${result.parentsCreated || 0} parents créés`, 'success');
      setForm({ ...form, importFile: null });
      setShowImport(false);
      loadStudents();

      setTimeout(() => { setShowProgress(false); }, 1500);
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'import', 'error');
      setShowProgress(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = async () => {
    setActionLoading(true);
    setShowProgress(true);
    setProgressTitle('Préparation de l\'export');
    setProgressMessage('Génération du fichier...');
    setProgressPercent(30);

    try {
      const columns: ExportColumn[] = [
        { header: 'Nom', key: 'name', width: 24 },
        { header: 'Matricule', key: 'matricule', width: 18 },
        { header: 'Classe', key: 'classe', width: 18 },
        { header: 'Date de naissance', key: 'dateOfBirth', width: 16 },
        { header: 'Genre', key: 'gender', width: 10 },
        { header: 'Email', key: 'email', width: 28 },
      ];

      const data = filtered.map((s: any) => ({
        name: s.user?.name || s.name || '',
        matricule: s.matricule || '',
        classe: s.class?.name || '',
        dateOfBirth: s.dateOfBirth || '',
        gender: s.gender || '',
        email: s.user?.email || '',
      }));

      exportToFile(data, columns, `eleves_export_${new Date().toISOString().split('T')[0]}`, form.exportFormat === 'pdf' ? 'pdf' : 'excel', { title: 'Liste des Élèves', subtitle: `${filtered.length} élèves — Année scolaire 2025 — 2026` }, exportBranding);

      setProgressPercent(100);
      setProgressMessage('Export terminé !');
      showToast(`Export de ${filtered.length} élèves réussi`, 'success');
      setShowExport(false);
      setTimeout(() => { setShowProgress(false); }, 1000);
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'export', 'error');
      setShowProgress(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewNotes = (student: any) => {
    router.push(`/grades?student=${student.id}`);
  };

  const handleViewPayments = (student: any) => {
    router.push(`/payments?student=${student.id}`);
  };

  const handleViewAttendance = (student: any) => {
    router.push(`/attendance?student=${student.id}`);
  };

  const openEdit = (student: any) => {
    setForm({ 
      ...form, 
      matricule: student.matricule || '', 
      classId: student.classId || '',
      phone: student.phone || '',
      gender: student.gender || '',
      dateOfBirth: student.dateOfBirth || '',
      address: student.address || ''
    });
    setShowEdit(student);
  };

  const openGuardian = async (student: any) => {
    setShowGuardian(student);
    setGuardianList([]);
    try {
      const supabase = getSupabase();
      const { data: links } = await supabase
        .from('parent_students')
        .select('*, parent:parents(*, user:users(*))')
        .eq('student_id', student.id);
      if (links && links.length > 0) {
        const existing: Guardian[] = links.map((link: any) => ({
          id: link.parent?.user?.id || link.parent_id,
          name: link.parent?.user?.name || '',
          email: link.parent?.user?.email || '',
          phone: link.parent?.user?.phone || '',
          relationship: link.relationship || 'guardian',
          profession: link.parent?.profession || '',
          isEmergencyContact: link.is_primary_contact || false,
          studentId: student.id,
        }));
        setGuardianList(existing);
      }
    } catch {}
  };

  const openTransfer = (student: any) => {
    setShowTransfer(student);
    setTransferForm({
      fromClassId: student.classId || '',
      toClassId: '',
      transferDate: new Date().toISOString().split('T')[0],
      reason: ''
    });
  };


  const handleAddGuardian = async () => {
    if (!guardianForm.name || !guardianForm.phone) {
      showToast('Nom et téléphone requis', 'error');
      return;
    }
    if (!showGuardian?.id) { showToast('Élève non sélectionné', 'error'); return; }
    setActionLoading(true);
    try {
      const supabase = getSupabase();
      const { data: { session } } = await supabase.auth.getSession();

      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({
          name: guardianForm.name,
          email: guardianForm.email || undefined,
          role: 'PARENT',
          phone: guardianForm.phone,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Erreur création compte parent');

      const parentUserId = result.user.id;

      const { data: parentRecord } = await supabase
        .from('parents')
        .select('id')
        .eq('user_id', parentUserId)
        .single();

      if (parentRecord) {
        if (guardianForm.profession) {
          await supabase.from('parents').update({ profession: guardianForm.profession, relationship: guardianForm.relationship.toUpperCase() }).eq('id', parentRecord.id);
        }

        await supabase.from('parent_students').upsert({
          parent_id: parentRecord.id,
          student_id: showGuardian.id,
          relationship: guardianForm.relationship,
          is_primary_contact: guardianForm.isEmergencyContact,
        }, { onConflict: 'parent_id,student_id' });
      }

      const newGuardian: Guardian = {
        id: parentUserId,
        ...guardianForm,
        studentId: showGuardian.id
      };
      setGuardianList([...guardianList, newGuardian]);
      setGuardianForm({ name: '', email: '', phone: '', relationship: 'father', address: '', profession: '', isEmergencyContact: true });

      const creds = result.access_kit;
      const displayId = creds?.identifier || result.user.identifier;
      const displayPwd = creds?.temp_password || result.user.temp_password || creds?.invitation_code || '';
      showToast(`Parent créé ! Identifiant: ${displayId} — Mot de passe: ${displayPwd}`, 'success');

      if (guardianForm.email) {
        sbEmailTrigger.onParentCreated(guardianForm.email, guardianForm.name, displayPwd);
      }

      setImportCredentials(prev => [...prev, {
        name: guardianForm.name,
        matricule: displayId,
        email: result.user.email,
        password: displayPwd,
      }]);
    } catch (e: any) {
      showToast(e.message || 'Erreur création représentant', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveGuardian = async (guardianId: string) => {
    try {
      const supabase = getSupabase();
      const { data: parentRecord } = await supabase.from('parents').select('id').eq('user_id', guardianId).single();
      if (parentRecord && showGuardian?.id) {
        await supabase.from('parent_students').delete().eq('parent_id', parentRecord.id).eq('student_id', showGuardian.id);
      }
      setGuardianList(guardianList.filter(g => g.id !== guardianId));
      showToast('Représentant légal dissocié', 'success');
    } catch {
      setGuardianList(guardianList.filter(g => g.id !== guardianId));
      showToast('Représentant légal supprimé', 'success');
    }
  };

  const handleTransfer = async () => {
    if (!transferForm.toClassId || !transferForm.reason) {
      showToast('Destination et motif requis', 'error');
      return;
    }
    setActionLoading(true);
    try {
      const supabase = getSupabase();
      await supabase.from('students').update({ class_id: transferForm.toClassId }).eq('id', showTransfer.id);
      showToast(`${showTransfer?.user?.name} transféré(e) avec succès`, 'success');
      setShowTransfer(null);
      loadStudents();
    } catch (e: any) {
      showToast(e.message || 'Erreur lors du transfert', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    const newSet = new Set(selectedStudents);
    if (newSet.has(studentId)) {
      newSet.delete(studentId);
    } else {
      newSet.add(studentId);
    }
    setSelectedStudents(newSet);
  };

  const selectAllStudents = () => {
    if (selectedStudents.size === filtered.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filtered.map(s => s.id)));
    }
  };

  const handleBulkTransfer = () => {
    if (selectedStudents.size === 0) return;
    const firstSelected = students.find(s => selectedStudents.has(s.id));
    if (firstSelected) openTransfer(firstSelected);
  };

  const handleBulkExport = async () => {
    if (selectedStudents.size === 0) return;
    setActionLoading(true);
    try {
      const selectedData = students.filter(s => selectedStudents.has(s.id));
      const columns: ExportColumn[] = [
        { header: 'Nom', key: 'name', width: 24 },
        { header: 'Matricule', key: 'matricule', width: 18 },
        { header: 'Classe', key: 'classe', width: 18 },
        { header: 'Genre', key: 'gender', width: 10 },
        { header: 'Email', key: 'email', width: 28 },
      ];
      const data = selectedData.map((s: any) => ({
        name: s.user?.name || '',
        matricule: s.matricule || '',
        classe: s.class?.name || '',
        gender: s.gender === 'M' ? 'Masculin' : s.gender === 'F' ? 'Féminin' : '',
        email: s.user?.email || '',
      }));
      exportToFile(data, columns, `eleves_selection_${new Date().toISOString().split('T')[0]}`, 'excel', { title: 'Élèves sélectionnés', subtitle: `${selectedData.length} élèves` }, exportBranding);
      showToast(`Export de ${selectedData.length} élèves réussi`, 'success');
      setSelectedStudents(new Set());
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de l\'export', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Gestion' }, { label: 'Liste des élèves' }]}>
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">Gestion des élèves</h2>
          <p className="text-on-surface-variant mt-2 max-w-lg">
            {analytics.totalStudents} élèves enregistrés • {selectedStudents.size > 0 && `${selectedStudents.size} sélectionnés • `}
            <button onClick={() => setShowBulkActions(!showBulkActions)} className="text-indigo-600 hover:underline">
              {showBulkActions ? 'Masquer' : 'Actions groupées'}
            </button>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom ou matricule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 bg-surface-container-low border-none rounded-full pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <>
              <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-green-20 hover:shadow-xl active:scale-95 transition-all">
                <UploadCloud size={16} />
                Importer
              </button>
              <button onClick={() => setShowExport(true)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-20 hover:shadow-xl active:scale-95 transition-all">
                <DownloadCloud size={16} />
                Exporter
              </button>
              <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl active:scale-95 transition-all">
                <Plus size={16} />
                Ajouter élève
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Classe</label>
            <select
              value={filters.classId}
              onChange={(e) => setFilters({ ...filters, classId: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Toutes les classes</option>
              <option value="none">Sans classe</option>
              {getClassesList().map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Sexe</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les genres</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Statut</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="graduated">Diplômé</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Date d&apos;inscription</label>
            <div className="flex gap-2">
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button onClick={() => setFilters({ classId: '', gender: '', status: '', dateFrom: '', dateTo: '' })} className="px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 flex items-center gap-2">
            <FilterX size={16} />
            Réinitialiser
          </button>
          <span className="text-sm text-slate-500">{filtered.length} résultat(s)</span>
        </div>
      </div>

      {/* Unassigned students warning */}
      {students.filter(s => !s.classId).length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">
              {students.filter(s => !s.classId).length} élève(s) sans classe assignée
            </p>
            <p className="text-sm text-amber-700">Veuillez assigner une classe à ces élèves pour un suivi complet.</p>
          </div>
          <button
            onClick={() => setFilters({ ...filters, classId: 'none' })}
            className="ml-auto px-3 py-1.5 bg-amber-100 text-amber-800 text-sm font-semibold rounded-lg hover:bg-amber-200"
          >
            Voir
          </button>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {showBulkActions && selectedStudents.size > 0 && (
        <div className="bg-indigo-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-indigo-600" />
            <span className="font-medium text-indigo-900">{selectedStudents.size} élève(s) sélectionné(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleBulkTransfer} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
              <ArrowLeftRight size={16} />
              Transférer
            </button>
            <button onClick={handleBulkExport} className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-100 flex items-center gap-2">
              <Download size={16} />
              Exporter
            </button>
            <button onClick={() => setSelectedStudents(new Set())} className="px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h3 className="text-lg font-bold text-on-surface mb-4">Répartition par classe</h3>
          <div className="space-y-2">
            {analytics.byClass.length > 0 ? analytics.byClass.slice(0, 6).map((cls: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{cls.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(cls.count / Math.max(...analytics.byClass.map((c: any) => c.count))) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-8">{cls.count}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-4">Aucune donnée</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h3 className="text-lg font-bold text-on-surface mb-4">Répartition par sexe</h3>
          <div className="flex items-center justify-center h-32 gap-8">
            {analytics.byGender.length > 0 ? analytics.byGender.map((gender: any, i: number) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-2 ${i === 0 ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                  {gender.value}
                </div>
                <span className="text-sm text-slate-600">{gender.label}</span>
                <span className="block text-xs text-slate-400">{gender.percentage}%</span>
              </div>
            )) : (
              <p className="text-sm text-slate-400">Aucune donnée</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h3 className="text-lg font-bold text-on-surface mb-4">Inscriptions récentes</h3>
          <div className="space-y-3">
            {analytics.monthlyEnrollments.length > 0 ? analytics.monthlyEnrollments.map((m: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{m.month}</span>
                <span className="text-sm font-bold text-indigo-600">+{m.count}</span>
              </div>
            )) : (
              <p className="text-sm text-slate-400 text-center py-4">Aucune donnée</p>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-10">
                  <input type="checkbox" checked={selectedStudents.size === filtered.length && filtered.length > 0} onChange={selectAllStudents} className="rounded" />
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Photo</th>
                <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nom & Prénom</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matricule</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classe</th>
                <th className="px-8 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parent</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Statut</th>
                <th className="px-10 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400">
                  <Loader2 size={24} className="animate-spin mx-auto" />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400">Aucun élève trouvé</td></tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className={`hover:bg-slate-50/80 transition-colors group ${selectedStudents.has(student.id) ? 'bg-indigo-50' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedStudents.has(student.id)} onChange={() => toggleStudentSelection(student.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-sm">
                        {student.user?.name?.charAt(0) || '?'}
                      </div>
                    </td>
                    <td className="px-8 py-3">
                      <p className="text-sm font-medium text-on-surface">{student.user?.name}</p>
                      <p className="text-xs text-on-surface-variant">{student.user?.email}</p>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-on-surface-variant font-mono">#{student.matricule}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-medium text-on-surface">{student.class?.name || '-'}</span>
                    </td>
                    <td className="px-8 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          {student.parent?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-on-surface">{student.parent?.name || '-'}</p>
                          <p className="text-xs text-on-surface-variant">{student.parent?.phone || 'Aucun'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        student.status === 'active' ? 'bg-green-100 text-green-700' :
                        student.status === 'inactive' ? 'bg-slate-100 text-slate-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status === 'active' ? 'Actif' : student.status === 'inactive' ? 'Inactif' : 'Diplômé'}
                      </span>
                    </td>
                    <td className="px-10 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setShowPreview(student)} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Voir le profil"><Eye size={16} /></button>
                        <button onClick={() => openGuardian(student)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Représentants légaux"><UsersRound size={16} /></button>
                        <button onClick={() => openTransfer(student)} className="p-2 text-slate-400 hover:text-purple-600 transition-colors" title="Transférer de classe"><ArrowLeftRight size={16} /></button>
                        {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                          <>
                            <button onClick={() => openEdit(student)} className="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Modifier les informations"><Edit size={16} /></button>
                            <button onClick={() => handleViewNotes(student)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors" title="Voir les notes"><BarChart3 size={16} /></button>
                            <button onClick={() => handleViewPayments(student)} className="p-2 text-slate-400 hover:text-green-500 transition-colors" title="Voir les paiements"><CreditCard size={16} /></button>
                            <button onClick={() => handleViewAttendance(student)} className="p-2 text-slate-400 hover:text-yellow-500 transition-colors" title="Voir les présences"><CalendarCheck size={16} /></button>
                            <button onClick={() => setShowDelete(student)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Supprimer l'élève"><Trash2 size={16} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowCreate(false); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">Ajouter un élève</h3>
              <button onClick={() => { setShowCreate(false); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom complet *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" placeholder="Traoré Awa" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" placeholder="awa@student.ci" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Classe *</label>
                <select value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm">
                  <option value="">Sélectionner une classe</option>
                  {classesList.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Matricule national</label>
                  <input value={form.matricule} onChange={(e) => setForm({ ...form, matricule: e.target.value.toUpperCase() })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm font-mono" placeholder="16137807D" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Téléphone</label>
                  <SmartPhoneInput value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} countryCode="CI" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Sexe</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm">
                    <option value="">Sélectionner</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date de naissance</label>
                  <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Adresse</label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" placeholder="Cocody, Abidjan" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowCreate(false); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleCreate} disabled={actionLoading} className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-container disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Création...' : <><Check size={16} /> Créer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">Détails de l&apos;élève</h3>
              <button onClick={() => setShowPreview(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xl">
                {showPreview.user?.name?.charAt(0) || '?'}
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">{showPreview.user?.name}</p>
                <p className="text-sm text-slate-500">{showPreview.user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Matricule</p>
                <p className="text-sm font-bold text-on-surface mt-1">#{showPreview.matricule || '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Classe</p>
                <p className="text-sm font-bold text-on-surface mt-1">{showPreview.class?.name || '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Genre</p>
                <p className="text-sm font-bold text-on-surface mt-1">{showPreview.gender === 'M' ? 'Masculin' : showPreview.gender === 'F' ? 'Féminin' : '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Date de naissance</p>
                <p className="text-sm font-bold text-on-surface mt-1">{showPreview.dateOfBirth ? new Date(showPreview.dateOfBirth).toLocaleDateString('fr-FR') : '-'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 col-span-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Adresse</p>
                <p className="text-sm font-bold text-on-surface mt-1">{showPreview.address || '-'}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowPreview(null); openGuardian(showPreview); }} className="flex-1 py-3 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2">
                <UsersRound size={16} /> Représentants
              </button>
              <button onClick={() => { setShowPreview(null); openTransfer(showPreview); }} className="flex-1 py-3 bg-purple-50 text-purple-600 font-semibold rounded-xl hover:bg-purple-100 flex items-center justify-center gap-2">
                <ArrowLeftRight size={16} /> Transférer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GUARDIAN MODAL */}
      {showGuardian && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowGuardian(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Représentants légaux</h3>
                <p className="text-sm text-slate-500">{showGuardian?.user?.name}</p>
              </div>
              <button onClick={() => setShowGuardian(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>

            {/* Guardian List */}
            <div className="space-y-4 mb-6">
              {guardianList.map(guardian => (
                <div key={guardian.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        guardian.relationship === 'father' ? 'bg-blue-100 text-blue-600' :
                        guardian.relationship === 'mother' ? 'bg-pink-100 text-pink-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {guardian.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{guardian.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{guardian.relationship === 'father' ? 'Père' : guardian.relationship === 'mother' ? 'Mère' : 'Tuteur'} {guardian.isEmergencyContact && <span className="text-red-500 ml-1">(Urgence)</span>}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Phone size={12} /> {guardian.phone}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {guardian.email}</span>
                        </div>
                        {guardian.profession && <p className="text-xs text-slate-400 mt-1">Profession: {guardian.profession}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleRemoveGuardian(guardian.id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash size={16} className="text-red-400" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Guardian Form */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
                <UserPlus size={18} />
                Ajouter un représentant
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom *</label>
                  <input value={guardianForm.name} onChange={(e) => setGuardianForm({ ...guardianForm, name: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Nom complet" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Téléphone *</label>
                  <SmartPhoneInput value={guardianForm.phone} onChange={(value) => setGuardianForm({ ...guardianForm, phone: value })} countryCode="CI" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                  <input type="email" value={guardianForm.email} onChange={(e) => setGuardianForm({ ...guardianForm, email: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="email@exemple.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Lien de parenté</label>
                  <select value={guardianForm.relationship} onChange={(e) => setGuardianForm({ ...guardianForm, relationship: e.target.value as Guardian['relationship'] })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm">
                    <option value="father">Père</option>
                    <option value="mother">Mère</option>
                    <option value="guardian">Tuteur/Tutrice</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Profession</label>
                  <input value={guardianForm.profession} onChange={(e) => setGuardianForm({ ...guardianForm, profession: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Profession" />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={guardianForm.isEmergencyContact} onChange={(e) => setGuardianForm({ ...guardianForm, isEmergencyContact: e.target.checked })} className="rounded" />
                    <span className="text-sm text-slate-600">Contact d&apos;urgence</span>
                  </label>
                </div>
              </div>
              <button onClick={handleAddGuardian} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                <UserPlus size={16} /> Ajouter le représentant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER MODAL */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowTransfer(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-on-surface">Transfert d&apos;élève</h3>
                <p className="text-sm text-slate-500">{showTransfer?.user?.name}</p>
              </div>
              <button onClick={() => setShowTransfer(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Classe actuelle</label>
                <div className="px-4 py-3 bg-slate-100 rounded-xl text-sm font-medium text-slate-600">
                  {showTransfer?.class?.name || 'Non assigné'}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nouvelle classe *</label>
                <select value={transferForm.toClassId} onChange={(e) => setTransferForm({ ...transferForm, toClassId: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="">Sélectionner la classe de destination</option>
                  {getClassesList().filter(c => c.id !== showTransfer?.classId).map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date de transfert</label>
                <input type="date" value={transferForm.transferDate} onChange={(e) => setTransferForm({ ...transferForm, transferDate: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Motif du transfert *</label>
                <textarea value={transferForm.reason} onChange={(e) => setTransferForm({ ...transferForm, reason: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm h-24 resize-none" placeholder="Ex: Réorganisation des classes, Demande des parents..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowTransfer(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleTransfer} className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
                <ArrowLeftRight size={16} /> Demander transfert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowEdit(null); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">Modifier l&apos;élève</h3>
              <button onClick={() => { setShowEdit(null); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nom</label>
                <input value={showEdit.user?.name || ''} disabled className="w-full px-4 py-3 bg-slate-100 rounded-xl text-sm text-slate-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Matricule</label>
                <input value={form.matricule} onChange={(e) => setForm({ ...form, matricule: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Téléphone</label>
                <SmartPhoneInput value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} countryCode="CI" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowEdit(null); setForm({ name: '', email: '', matricule: '', classId: '', phone: '', gender: '', dateOfBirth: '', address: '', importFile: null, exportFormat: 'excel' }); }} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleEdit} disabled={actionLoading} className="flex-1 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Modification...' : <><Check size={16} /> Enregistrer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDelete(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">Supprimer l&apos;élève</h3>
                <p className="text-sm text-slate-500">Cette action est irréversible.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>{showDelete.user?.name}</strong> ?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(null)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleDelete} disabled={actionLoading} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-50">
                {actionLoading ? 'Suppression...' : 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowImport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">Import massif d&apos;élèves</h3>
              <button onClick={() => setShowImport(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Fichier Excel/CSV</label>
                <div className="relative">
                  <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => { if (e.target.files?.[0]) setForm({ ...form, importFile: e.target.files[0] }); }} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1">Formats: .xlsx, .xls, .csv (max 10MB)</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-slate-600 mb-2">Le fichier doit contenir les colonnes:</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Nom', 'Email', 'Téléphone', 'Date de naissance', 'Genre', 'Adresse'].map(col => (
                    <span key={col} className="px-2 py-1 bg-slate-100 rounded text-slate-600">{col}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowImport(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleImport} disabled={actionLoading} className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Validation...' : <><UploadCloud size={16} /> Importer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExport && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-on-surface">Exporter les données</h3>
              <button onClick={() => setShowExport(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Format</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
                    <input type="radio" value="excel" checked={form.exportFormat === 'excel'} onChange={(e) => setForm({ ...form, exportFormat: e.target.value as 'excel' | 'pdf' })} className="h-4 w-4 text-indigo-600" />
                    <FileSpreadsheet size={20} className="text-emerald-600" />
                    <span className="text-sm">Excel (.xlsx)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
                    <input type="radio" value="pdf" checked={form.exportFormat === 'pdf'} onChange={(e) => setForm({ ...form, exportFormat: e.target.value as 'excel' | 'pdf' })} className="h-4 w-4 text-indigo-600" />
                    <FileText size={20} className="text-red-600" />
                    <span className="text-sm">PDF</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Contenu à exporter</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span className="text-sm">Informations de base</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="rounded" />
                    <span className="text-sm">Coordonnées parents</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Historique scolaire</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowExport(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
              <button onClick={handleExport} disabled={actionLoading} className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading ? 'Préparation...' : <><DownloadCloud size={16} /> Exporter</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8">
            <h3 className="text-lg font-bold text-on-surface mb-4">{progressTitle}</h3>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">{progressMessage}</p>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              <p className="text-xs text-slate-500 text-right">{progressPercent}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Display Modal */}
      {importCredentials.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40 bg-white rounded-2xl shadow-2xl border border-green-200 p-6 w-96 max-h-[50vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-green-700 flex items-center gap-2"><Shield size={18} /> Accès créés ({importCredentials.length})</h4>
            <button onClick={() => setImportCredentials([])} className="p-1 hover:bg-slate-100 rounded"><X size={16} /></button>
          </div>
          <div className="space-y-3">
            {importCredentials.map((cred, i) => (
              <div key={i} className="p-3 bg-green-50 rounded-xl border border-green-100 text-xs space-y-1">
                <p className="font-semibold text-green-800">{cred.name}</p>
                {cred.matricule && <p className="text-green-700">Identifiant: <code className="bg-green-100 px-1 rounded font-mono">{cred.matricule}</code></p>}
                {cred.email && <p className="text-green-700">Email: <code className="bg-green-100 px-1 rounded font-mono">{cred.email}</code></p>}
                {cred.password && <p className="text-green-700">Mot de passe: <code className="bg-green-100 px-1 rounded font-mono">{cred.password}</code></p>}
              </div>
            ))}
          </div>
          <button onClick={() => { navigator.clipboard.writeText(importCredentials.map(c => `${c.name} | ${c.matricule || ''} | ${c.email || ''} | ${c.password || ''}`).join('\n')); showToast('Accès copiés dans le presse-papier', 'success'); }} className="mt-3 w-full py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700">
            Copier tous les accès
          </button>
        </div>
      )}
    </RoleLayout>
  );
}
