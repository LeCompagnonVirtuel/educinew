'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { sbSchools, sbAuth } from '@/lib/api';
import RoleLayout from '@/components/layout/RoleLayout';
import PaymentsSettings from '@/components/settings/PaymentsSettings';
import GatewaySettings from '@/components/settings/GatewaySettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import DocumentSettings from '@/components/settings/DocumentSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import AcademicYearSettings from '@/components/settings/AcademicYearSettings';
import SystemSettings from '@/components/settings/SystemSettings';
import BrandingSettings from '@/components/settings/BrandingSettings';
import UserManagementSettings from '@/components/settings/UserManagementSettings';
import ClassesSettings from '@/components/settings/ClassesSettings';
import CalendarSettings from '@/components/settings/CalendarSettings';
import {
  Building2, Shield, CreditCard, Bell, Palette, Globe, Plug, Database, Wrench,
  Save, Upload, Eye, EyeOff, Check, X, Loader2, Lock, Smartphone,
  Mail, Phone, MapPin, Calendar, ChevronRight, AlertTriangle,
  Download, RefreshCw, Server, Key, Users, Moon, Sun, Monitor,
  Camera, Trash2, CheckCircle, Clock, RefreshCcw, GraduationCap,
  UserCheck, UserCog, Bus, FileText, Bot, Settings2, Archive,
  Pause, Play, AlertCircle, Copy, Plus, BookOpen
} from 'lucide-react';

type TabId = 'school' | 'management' | 'academic' | 'classes' | 'calendar' | 'security' | 'payments' | 'notifications' | 'personalization' | 'users' | 'transport' | 'ai' | 'documents' | 'system' | 'integrations' | 'backup';

const tabs = [
  { id: 'school' as const, icon: Building2, labelFr: 'Établissement', labelEn: 'School' },
  { id: 'management' as const, icon: Settings2, labelFr: 'Gestion', labelEn: 'Management' },
  { id: 'academic' as const, icon: GraduationCap, labelFr: 'Académique', labelEn: 'Academic' },
  { id: 'classes' as const, icon: BookOpen, labelFr: 'Classes & Matières', labelEn: 'Classes & Subjects' },
  { id: 'calendar' as const, icon: Calendar, labelFr: 'Calendrier', labelEn: 'Calendar' },
  { id: 'security' as const, icon: Shield, labelFr: 'Sécurité', labelEn: 'Security' },
  { id: 'payments' as const, icon: CreditCard, labelFr: 'Paiements', labelEn: 'Payments' },
  { id: 'notifications' as const, icon: Bell, labelFr: 'Notifications', labelEn: 'Notifications' },
  { id: 'personalization' as const, icon: Palette, labelFr: 'Apparence', labelEn: 'Appearance' },
  { id: 'users' as const, icon: Users, labelFr: 'Utilisateurs', labelEn: 'Users' },
  { id: 'transport' as const, icon: Bus, labelFr: 'Transport', labelEn: 'Transport' },
  { id: 'ai' as const, icon: Bot, labelFr: 'IA', labelEn: 'AI' },
  { id: 'documents' as const, icon: FileText, labelFr: 'Documents', labelEn: 'Documents' },
  { id: 'system' as const, icon: Globe, labelFr: 'Système', labelEn: 'System' },
  { id: 'integrations' as const, icon: Plug, labelFr: 'Intégrations', labelEn: 'Integrations' },
  { id: 'backup' as const, icon: Database, labelFr: 'Sauvegarde', labelEn: 'Backup' },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const refreshUser = () => window.location.reload();
  const setLanguage = (l: string) => { localStorage.setItem('lang', l); window.location.reload(); };
  const [activeTab, setActiveTab] = useState<TabId>('school');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const [schoolData, setSchoolData] = useState({
    name: '', code: '', sigle: '', slogan: '', description: '',
    email: '', phone: '', address: '', city: '', region: '', country: 'Côte d\'Ivoire', website: '',
    logo: null as string | null, faviconUrl: '',
    primaryColor: '#1B4D8E', secondaryColor: '#4CAF50', accentColor: '#F5A623',
    latitude: 0, longitude: 0, checkinRadius: 100,
    academicYear: `${new Date().getFullYear() + 1}-${new Date().getFullYear() + 2}`, gradingSystem: '20', passingGrade: 10,
    timezone: 'Africa/Abidjan', currency: 'XOF',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
    twoFactorEnabled: false, sessionTimeout: 30,
  });

  const [paymentData, setPaymentData] = useState({
    registrationFee: 0, tuitionFee: 0, transportFee: 0,
    paymentMethods: { moneyFusion: true, cash: true },
    dueDay: 5, lateFee: 5000,
  });

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true, pushNotifications: true, smsNotifications: false,
    notifyAttendance: true, notifyGrades: true, notifyPayments: true, notifyMessages: true,
  });

  const [themeData, setThemeData] = useState({
    mode: 'light' as 'light' | 'dark' | 'system',
    primaryColor: '#4F46E5', accentColor: '#10B981',
  });

  const [academicData, setAcademicData] = useState({
    gradingScale: '20', passingGrade: 10, coefficientsEnabled: true,
    periodsType: 'TRIMESTER', periodsCount: 3,
    matriculePrefix: 'EDU', matriculeAutoGenerate: true,
    reportCardSignature: '', reportCardStamp: '',
    teacherCheckinRequired: true, checkinMethod: 'GPS',
    maxCheckinDistance: 200, lateThresholdMinutes: 15,
    parentMaxChildren: 10, parentPaymentEnabled: true,
    busTrackingEnabled: true, busNotifyParents: true,
    aiDailyLimit: 50, aiHistoryEnabled: true,
  });

  const [managementData, setManagementData] = useState({
    academicYears: [
      { id: '1', name: `${new Date().getFullYear() + 1}-${new Date().getFullYear() + 2}`, startDate: `${new Date().getFullYear() + 1}-09-01`, endDate: `${new Date().getFullYear() + 2}-06-30`, status: 'ACTIVE' },
    ],
    newYearName: '', newYearStart: '', newYearEnd: '',
    schoolStatus: 'ACTIVE' as 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'DELETED',
    confirmDelete: '',
    schoolStats: { students: 0, teachers: 0, parents: 0, classes: 0, users: 0 },
  });

  const [integrationData, setIntegrationData] = useState({
    aiEnabled: true, mapsEnabled: true, gatewayEnabled: true,
    apiKeys: { ai: '', maps: '', gateway: '' },
  });

  useEffect(() => {
    if (user?.schoolId) {
      loadSettings();
    }
  }, [user?.schoolId]);

  const loadSettings = async () => {
    try {
      const school = await sbSchools.get(user!.schoolId!);
      if (school) {
        setSchoolData((prev: any) => ({
          ...prev,
          name: school.name || '',
          code: school.code || '',
          sigle: school.sigle || '',
          slogan: school.slogan || '',
          description: school.description || '',
          email: school.email || '',
          phone: school.phone || '',
          address: school.address || '',
          city: school.city || '',
          region: school.region || '',
          country: school.country || 'Côte d\'Ivoire',
          website: school.website || '',
          logo: school.logoUrl || null,
          faviconUrl: school.faviconUrl || '',
          primaryColor: school.primaryColor || '#1B4D8E',
          secondaryColor: school.secondaryColor || '#4CAF50',
          accentColor: school.accentColor || '#F5A623',
          latitude: school.latitude || 0,
          longitude: school.longitude || 0,
          checkinRadius: school.checkinRadius || 100,
          academicYear: school.academicYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
          gradingSystem: school.gradingSystem || '20',
          passingGrade: school.passingGrade || 10,
          timezone: school.timezone || 'Africa/Abidjan',
          currency: school.currency || 'XOF',
        }));
        if (school.notifications) setNotificationData(school.notifications);
        if (school.paymentSettings || school.payment_settings) setPaymentData(school.paymentSettings || school.payment_settings);
        if (school.theme) setThemeData(school.theme);
        if (school.academicSettings || school.academic_settings) setAcademicData(prev => ({ ...prev, ...(school.academicSettings || school.academic_settings) }));
        if (school.integrations) setIntegrationData(prev => ({ ...prev, ...school.integrations }));

        // Load academic years from database
        try {
          const { data: years } = await (await import('@/lib/supabase/client')).createClient()
            .from('academic_years')
            .select('*')
            .eq('school_id', user!.schoolId!)
            .order('start_date', { ascending: false });
          if (years && years.length > 0) {
            setManagementData(prev => ({
              ...prev,
              academicYears: years.map((y: any) => ({
                id: y.id,
                name: y.name,
                startDate: y.start_date,
                endDate: y.end_date,
                status: y.status || 'ACTIVE',
              })),
              schoolStatus: school.status || 'ACTIVE',
            }));
          }
        } catch { /* academic years table may not exist */ }

        // Load school stats
        try {
          const stats = await sbSchools.getStats(user!.schoolId!);
          setManagementData(prev => ({
            ...prev,
            schoolStats: {
              students: stats.studentsCount || 0,
              teachers: stats.teachersCount || 0,
              parents: 0,
              classes: stats.classesCount || 0,
              users: (stats.studentsCount || 0) + (stats.teachersCount || 0),
            },
          }));
        } catch { /* stats may fail */ }
      }
    } catch (e) {
    }
    setLoading(false);
  };

  const handleSave = async (tab: TabId) => {
    setSaving(true);
    setSaved(false);
    try {
      switch (tab) {
        case 'school':
          if (!schoolData.name?.trim()) {
            showToast(lang === 'fr' ? 'Le nom de l\'établissement est requis' : 'School name is required');
            setSaving(false);
            return;
          }
          await sbSchools.update(user!.schoolId!, {
            name: schoolData.name?.trim() || undefined,
            sigle: schoolData.sigle || undefined,
            slogan: schoolData.slogan || undefined,
            description: schoolData.description || undefined,
            email: schoolData.email || undefined,
            phone: schoolData.phone || undefined,
            address: schoolData.address || undefined,
            city: schoolData.city || undefined,
            region: schoolData.region || undefined,
            country: schoolData.country || undefined,
            website: schoolData.website || undefined,
            logo_url: schoolData.logo || undefined,
            latitude: schoolData.latitude || undefined,
            longitude: schoolData.longitude || undefined,
            checkin_radius: schoolData.checkinRadius || undefined,
          });
          break;
        case 'personalization':
          await sbSchools.update(user!.schoolId!, {
            primary_color: schoolData.primaryColor || undefined,
            secondary_color: schoolData.secondaryColor || undefined,
            accent_color: schoolData.accentColor || undefined,
          });
          break;
        case 'management':
          await sbSchools.update(user!.schoolId!, {
            status: managementData.schoolStatus,
          });
          break;
        case 'academic':
        case 'users':
        case 'transport':
        case 'ai':
        case 'documents':
          await sbSchools.update(user!.schoolId!, {
            academic_settings: academicData,
          });
          break;
        case 'system':
          await sbSchools.update(user!.schoolId!, {
            academic_year: schoolData.academicYear || undefined,
            grading_system: schoolData.gradingSystem || undefined,
            passing_grade: schoolData.passingGrade || undefined,
            timezone: schoolData.timezone || undefined,
            currency: schoolData.currency || undefined,
          });
          break;
        case 'security':
          if (securityData.newPassword !== securityData.confirmPassword) {
            showToast(lang === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match');
            setSaving(false);
            return;
          }
          if (securityData.newPassword && securityData.newPassword.length < 8) {
            showToast(lang === 'fr' ? 'Le mot de passe doit contenir au moins 8 caractères' : 'Password must be at least 8 characters');
            setSaving(false);
            return;
          }
          if (securityData.newPassword) {
            await sbAuth.changePassword(securityData.newPassword);
          }
          await fetch('/api/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ two_factor_enabled: securityData.twoFactorEnabled }),
          });
          break;
        case 'payments':
          await sbSchools.update(user!.schoolId!, {
            payment_settings: paymentData,
          });
          break;
        case 'notifications':
          await sbSchools.update(user!.schoolId!, {
            notifications: notificationData,
          });
          break;
        case 'integrations':
          await sbSchools.update(user!.schoolId!, {
            integrations: integrationData,
          });
          break;
        case 'backup':
          break;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      showToast(e.message || (lang === 'fr' ? 'Erreur lors de la sauvegarde' : 'Save error'));
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (!securityData.currentPassword || !securityData.newPassword) {
      showToast(lang === 'fr' ? 'Veuillez remplir tous les champs' : 'Please fill all fields');
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast(lang === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match');
      return;
    }
    if (securityData.newPassword.length < 8) {
      showToast(lang === 'fr' ? 'Le mot de passe doit contenir au moins 8 caractères' : 'Password must be at least 8 characters');
      return;
    }
    setSaving(true);
    try {
      await sbAuth.changePassword(securityData.newPassword);
      setSecurityData({ ...securityData, currentPassword: '', newPassword: '', confirmPassword: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      showToast(e.message || (lang === 'fr' ? 'Erreur de changement de mot de passe' : 'Password change error'));
    }
    setSaving(false);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as 'fr' | 'en');
    setSchoolData(prev => ({ ...prev, language: newLang }));
  };

  const exportData = async () => {
    setSaving(true);
    try {
      const data = await sbSchools.get(user!.schoolId!);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `educi-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      showToast(lang === 'fr' ? 'Erreur d\'export' : 'Export error');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <RoleLayout role="admin">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        </div>
      </RoleLayout>
    );
  }

  return (
    <RoleLayout role="admin">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-[#111827]">
            {lang === 'fr' ? 'Paramètres' : 'Settings'}
          </h1>
          <p className="text-[#6B7280] mt-1">
            {lang === 'fr' 
              ? 'Gérez la configuration de votre établissement' 
              : 'Manage your institution configuration'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-5 pb-2 border-b border-slate-200 scrollbar-thin">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all text-sm ${
                activeTab === tab.id
                  ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-200'
                  : 'text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]'
              }`}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{lang === 'fr' ? tab.labelFr : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          {saved && (
            <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">
                {lang === 'fr' ? 'Paramètres enregistrés' : 'Settings saved'}
              </span>
            </div>
          )}
          {toastMsg && (
            <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{toastMsg}</span>
            </div>
          )}

          {/* SCHOOL INFO */}
          {activeTab === 'school' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-[#4F46E5]" />
                Identité de l&apos;établissement
              </h2>

              {/* Logo & Branding */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-[#111827] mb-4">Logo & Branding</h3>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-white overflow-hidden">
                    {schoolData.logo ? (
                      <Image src={schoolData.logo} alt="Logo" width={96} height={96} className="w-full h-full object-contain" />
                    ) : (
                      <Camera size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-2">Logo principal (PNG, JPG - max 2MB)</p>
                    <label className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-lg hover:bg-[#4338ca] cursor-pointer inline-flex items-center">
                      <Upload size={14} className="inline mr-2" />Téléverser
                      <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 2 * 1024 * 1024) { showToast(lang === 'fr' ? 'Fichier trop volumineux (max 2MB)' : 'File too large (max 2MB)'); return; }
                        try {
                          setSaving(true);
                          const { createClient } = await import('@/lib/supabase/client');
                          const supabase = createClient();
                          const ext = file.name.split('.').pop();
                          const path = `${user!.schoolId}/logo.${ext}`;
                          const { error } = await supabase.storage.from('school-logos').upload(path, file, { upsert: true });
                          if (error) throw error;
                          const { data: { publicUrl } } = supabase.storage.from('school-logos').getPublicUrl(path);
                          setSchoolData(prev => ({ ...prev, logo: publicUrl }));
                          await sbSchools.update(user!.schoolId!, { logo_url: publicUrl });
                          showToast(lang === 'fr' ? 'Logo mis à jour' : 'Logo updated');
                        } catch (err: any) { showToast(err.message || (lang === 'fr' ? 'Erreur upload' : 'Upload error')); }
                        finally { setSaving(false); }
                      }} />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Devise</label>
                    <input type="text" value={schoolData.slogan} onChange={e => setSchoolData(prev => ({ ...prev, slogan: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="Ex: Le savoir pour tous" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Sigle</label>
                    <input type="text" value={schoolData.sigle} onChange={e => setSchoolData(prev => ({ ...prev, sigle: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="Ex: CME" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#374151] mb-1">Description</label>
                  <textarea value={schoolData.description} onChange={e => setSchoolData(prev => ({ ...prev, description: e.target.value }))} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none resize-none" placeholder="Brève description de l'établissement" />
                </div>
              </div>

              {/* Informations générales */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-[#111827] mb-4">Informations générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Nom de l&apos;établissement</label>
                    <input type="text" value={schoolData.name} onChange={e => setSchoolData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Code</label>
                    <input type="text" value={schoolData.code} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1"><Mail size={14} className="inline mr-1" />Email</label>
                    <input type="email" value={schoolData.email} onChange={e => setSchoolData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1"><Phone size={14} className="inline mr-1" />Téléphone</label>
                    <SmartPhoneInput value={schoolData.phone} onChange={(value) => setSchoolData(prev => ({ ...prev, phone: value }))} countryCode="CI" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1"><Globe size={14} className="inline mr-1" />Site web</label>
                    <input type="url" value={schoolData.website} onChange={e => setSchoolData(prev => ({ ...prev, website: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" placeholder="https://" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Pays</label>
                    <CountrySelect value={schoolData.country} onChange={(country) => setSchoolData(prev => ({ ...prev, country: country.nameFr || country.name }))} />
                  </div>
                </div>
              </div>

              {/* Localisation */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-[#111827] mb-4"><MapPin size={16} className="inline mr-2" />Localisation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Ville</label>
                    <input type="text" value={schoolData.city} onChange={e => setSchoolData(prev => ({ ...prev, city: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Région</label>
                    <input type="text" value={schoolData.region} onChange={e => setSchoolData(prev => ({ ...prev, region: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Adresse</label>
                    <input type="text" value={schoolData.address} onChange={e => setSchoolData(prev => ({ ...prev, address: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => handleSave('school')} disabled={saving} className="flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Enregistrer
                </button>
              </div>
            </div>
          )}

          {/* MANAGEMENT */}
          {activeTab === 'management' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Settings2 size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Gestion de l\'établissement' : 'School Management'}
              </h2>

              {/* School Info Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-100">
                <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Informations' : 'Information'}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center border">
                    <p className="text-2xl font-bold text-[#4F46E5]">{managementData.schoolStats.students}</p>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? 'Élèves' : 'Students'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border">
                    <p className="text-2xl font-bold text-emerald-600">{managementData.schoolStats.teachers}</p>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? 'Enseignants' : 'Teachers'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border">
                    <p className="text-2xl font-bold text-amber-600">{managementData.schoolStats.parents}</p>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? 'Parents' : 'Parents'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border">
                    <p className="text-2xl font-bold text-blue-600">{managementData.schoolStats.classes}</p>
                    <p className="text-xs text-slate-500">{lang === 'fr' ? 'Classes' : 'Classes'}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span>ID: {user?.schoolId?.slice(0, 8)}...</span>
                  <span>Code: {schoolData.code}</span>
                  <span>{lang === 'fr' ? 'Créé le' : 'Created'}: {new Date().toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {/* Academic Years */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                    <Calendar size={18} />
                    {lang === 'fr' ? 'Années scolaires' : 'Academic Years'}
                  </h3>
                  <button
                    onClick={() => {
                      const nextYear = managementData.academicYears.length > 0
                        ? `${parseInt(managementData.academicYears[managementData.academicYears.length - 1].name.split('-')[1])} - ${parseInt(managementData.academicYears[managementData.academicYears.length - 1].name.split('-')[1]) + 1}`
                        : '2027-2028';
                      setManagementData(prev => ({
                        ...prev,
                        academicYears: [...prev.academicYears, { id: String(Date.now()), name: nextYear, startDate: '', endDate: '', status: 'PREPARATION' }]
                      }));
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-xs font-bold rounded-lg hover:bg-[#4338ca]"
                  >
                    <Plus size={14} /> {lang === 'fr' ? 'Nouvelle année' : 'New Year'}
                  </button>
                </div>
                <div className="space-y-3">
                  {managementData.academicYears.map((year) => (
                    <div key={year.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${year.status === 'ACTIVE' ? 'bg-emerald-500' : year.status === 'PREPARATION' ? 'bg-amber-500' : year.status === 'ARCHIVED' ? 'bg-blue-500' : 'bg-red-500'}`} />
                        <div>
                          <p className="font-bold text-sm">{year.name}</p>
                          {year.startDate && <p className="text-xs text-slate-500">{year.startDate} → {year.endDate}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${year.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : year.status === 'PREPARATION' ? 'bg-amber-100 text-amber-700' : year.status === 'ARCHIVED' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                          {year.status === 'ACTIVE' ? (lang === 'fr' ? 'Active' : 'Active') : year.status === 'PREPARATION' ? (lang === 'fr' ? 'Préparation' : 'Preparation') : year.status === 'ARCHIVED' ? (lang === 'fr' ? 'Archivée' : 'Archived') : (lang === 'fr' ? 'Fermée' : 'Closed')}
                        </span>
                        {year.status === 'ACTIVE' && (
                          <button
                            onClick={() => setManagementData(prev => ({ ...prev, academicYears: prev.academicYears.map(y => y.id === year.id ? { ...y, status: 'ARCHIVED' } : y) }))}
                            className="px-2 py-1 text-xs bg-slate-100 rounded-lg hover:bg-slate-200"
                          >
                            <Archive size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* School Status Actions */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Statut de l\'établissement' : 'School Status'}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${managementData.schoolStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : managementData.schoolStatus === 'SUSPENDED' ? 'bg-amber-100 text-amber-700' : managementData.schoolStatus === 'ARCHIVED' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {managementData.schoolStatus === 'ACTIVE' ? '🟢 Actif' : managementData.schoolStatus === 'SUSPENDED' ? '🟡 Suspendu' : managementData.schoolStatus === 'ARCHIVED' ? '🔵 Archivé' : '🔴 Supprimé'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {managementData.schoolStatus !== 'SUSPENDED' && (
                    <button onClick={() => setManagementData(prev => ({ ...prev, schoolStatus: 'SUSPENDED' }))} className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100">
                      <Pause size={16} /> {lang === 'fr' ? 'Suspendre' : 'Suspend'}
                    </button>
                  )}
                  {managementData.schoolStatus === 'SUSPENDED' && (
                    <button onClick={() => setManagementData(prev => ({ ...prev, schoolStatus: 'ACTIVE' }))} className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100">
                      <Play size={16} /> {lang === 'fr' ? 'Réactiver' : 'Reactivate'}
                    </button>
                  )}
                  {managementData.schoolStatus !== 'ARCHIVED' && (
                    <button onClick={() => setManagementData(prev => ({ ...prev, schoolStatus: 'ARCHIVED' }))} className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100">
                      <Archive size={16} /> {lang === 'fr' ? 'Archiver' : 'Archive'}
                    </button>
                  )}
                  {managementData.schoolStatus === 'ARCHIVED' && (
                    <button onClick={() => setManagementData(prev => ({ ...prev, schoolStatus: 'ACTIVE' }))} className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100">
                      <RefreshCw size={16} /> {lang === 'fr' ? 'Restaurer' : 'Restore'}
                    </button>
                  )}
                  <button onClick={exportData} className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100">
                    <Download size={16} /> {lang === 'fr' ? 'Exporter' : 'Export'}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  {lang === 'fr' ? 'Zone dangereuse' : 'Danger Zone'}
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  {lang === 'fr' ? 'La suppression est irréversible. Toutes les données seront définitivement perdues.' : 'Deletion is irreversible. All data will be permanently lost.'}
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={lang === 'fr' ? `Tapez "${schoolData.name}" pour confirmer` : `Type "${schoolData.name}" to confirm`}
                    value={managementData.confirmDelete}
                    onChange={e => setManagementData(prev => ({ ...prev, confirmDelete: e.target.value }))}
                    className="flex-1 px-4 py-3 rounded-xl border border-red-200 bg-white focus:ring-2 focus:ring-red-400 outline-none text-sm"
                  />
                  <button
                    disabled={managementData.confirmDelete !== schoolData.name}
                    onClick={async () => {
                      if (managementData.confirmDelete !== schoolData.name) return;
                      showToast(lang === 'fr' ? 'La suppression d\'un établissement doit être effectuée par un Super Admin. Contactez le support.' : 'School deletion must be done by a Super Admin. Contact support.');
                    }}
                    className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} /> {lang === 'fr' ? 'Supprimer' : 'Delete'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => handleSave('management')} disabled={saving} className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338CA] disabled:opacity-50">
                  {saving ? (lang === 'fr' ? 'Enregistrement...' : 'Saving...') : (lang === 'fr' ? 'Enregistrer' : 'Save')}
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="p-6">
              <SecuritySettings />
            </div>
          )}

          {/* ACADEMIC */}
          {activeTab === 'academic' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Paramètres académiques' : 'Academic Settings'}
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Système de notation' : 'Grading System'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Échelle de notation' : 'Grading Scale'}</label>
                      <select value={academicData.gradingScale} onChange={e => setAcademicData(prev => ({ ...prev, gradingScale: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none">
                        <option value="10">{lang === 'fr' ? 'Sur 10' : 'Out of 10'}</option>
                        <option value="20">{lang === 'fr' ? 'Sur 20' : 'Out of 20'}</option>
                        <option value="100">{lang === 'fr' ? 'Sur 100' : 'Out of 100'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Moyenne minimale' : 'Passing Grade'}</label>
                      <input type="number" value={academicData.passingGrade} onChange={e => setAcademicData(prev => ({ ...prev, passingGrade: Number(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Coefficients' : 'Coefficients'}</label>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => setAcademicData(prev => ({ ...prev, coefficientsEnabled: !prev.coefficientsEnabled }))} className={`w-12 h-6 rounded-full transition-colors ${academicData.coefficientsEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${academicData.coefficientsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                        <span className="text-sm text-slate-600">{academicData.coefficientsEnabled ? (lang === 'fr' ? 'Activés' : 'Enabled') : (lang === 'fr' ? 'Désactivés' : 'Disabled')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Périodes scolaires' : 'School Periods'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Type de découpage' : 'Period Type'}</label>
                      <select value={academicData.periodsType} onChange={e => setAcademicData(prev => ({ ...prev, periodsType: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none">
                        <option value="TRIMESTER">{lang === 'fr' ? 'Trimestres' : 'Trimesters'}</option>
                        <option value="SEMESTER">{lang === 'fr' ? 'Semestres' : 'Semesters'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Nombre de périodes' : 'Number of Periods'}</label>
                      <input type="number" min={2} max={4} value={academicData.periodsCount} onChange={e => setAcademicData(prev => ({ ...prev, periodsCount: Number(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Matricules élèves' : 'Student IDs'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Format officiel' : 'Official Format'}</label>
                      <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-mono text-lg tracking-widest">
                        16137807D
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{lang === 'fr' ? '8 chiffres + 1 lettre majuscule' : '8 digits + 1 uppercase letter'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAcademicData(prev => ({ ...prev, matriculeAutoGenerate: !prev.matriculeAutoGenerate }))} className={`w-12 h-6 rounded-full transition-colors ${academicData.matriculeAutoGenerate ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${academicData.matriculeAutoGenerate ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                      <span className="text-sm text-slate-600">{lang === 'fr' ? 'Génération automatique' : 'Auto-generate'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => handleSave('academic')} disabled={saving} className="flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {lang === 'fr' ? 'Enregistrer' : 'Save'}
                </button>
              </div>
            </div>
          )}

          {/* USERS (Teachers, Students, Parents) */}
          {activeTab === 'users' && (
            <div className="p-6">
              <UserManagementSettings />
            </div>
          )}

          {/* CLASSES & SUBJECTS */}
          {activeTab === 'classes' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Classes, Matières & Niveaux' : 'Classes, Subjects & Levels'}
              </h2>
              <ClassesSettings />
            </div>
          )}

          {/* CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Calendrier scolaire' : 'School Calendar'}
              </h2>
              <CalendarSettings />
            </div>
          )}

          {/* TRANSPORT */}
          {activeTab === 'transport' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Bus size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Transport scolaire' : 'School Transport'}
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="text-sm font-medium">{lang === 'fr' ? 'Suivi GPS activé' : 'GPS Tracking enabled'}</span>
                      <button onClick={() => setAcademicData(prev => ({ ...prev, busTrackingEnabled: !prev.busTrackingEnabled }))} className={`w-12 h-6 rounded-full transition-colors ${academicData.busTrackingEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${academicData.busTrackingEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="text-sm font-medium">{lang === 'fr' ? 'Notifications parents' : 'Parent notifications'}</span>
                      <button onClick={() => setAcademicData(prev => ({ ...prev, busNotifyParents: !prev.busNotifyParents }))} className={`w-12 h-6 rounded-full transition-colors ${academicData.busNotifyParents ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${academicData.busNotifyParents ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">{lang === 'fr' ? 'Les parents recevront une notification quand le bus approche de l\'arrêt de leur enfant.' : 'Parents will be notified when the bus approaches their child\'s stop.'}</p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleSave('academic')} disabled={saving} className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338CA] disabled:opacity-50">
                    {saving ? (lang === 'fr' ? 'Enregistrement...' : 'Saving...') : (lang === 'fr' ? 'Enregistrer' : 'Save')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Settings */}
          {activeTab === 'ai' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Bot size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'EduCI AI' : 'EduCI AI'}
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-4">{lang === 'fr' ? 'Configuration IA' : 'AI Configuration'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">{lang === 'fr' ? 'Limite quotidienne (requêtes/élève)' : 'Daily limit (requests/student)'}</label>
                      <input type="number" value={academicData.aiDailyLimit} onChange={e => setAcademicData(prev => ({ ...prev, aiDailyLimit: Number(e.target.value) }))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] outline-none" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="text-sm font-medium">{lang === 'fr' ? 'Historique des conversations' : 'Conversation history'}</span>
                      <button onClick={() => setAcademicData(prev => ({ ...prev, aiHistoryEnabled: !prev.aiHistoryEnabled }))} className={`w-12 h-6 rounded-full transition-colors ${academicData.aiHistoryEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${academicData.aiHistoryEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-700">{lang === 'fr' ? 'L\'IA aide les élèves à comprendre leurs cours, générer des quiz et obtenir des explications personnalisées.' : 'AI helps students understand lessons, generate quizzes, and get personalized explanations.'}</p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleSave('academic')} disabled={saving} className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338CA] disabled:opacity-50">
                    {saving ? (lang === 'fr' ? 'Enregistrement...' : 'Saving...') : (lang === 'fr' ? 'Enregistrer' : 'Save')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="p-6">
              <DocumentSettings />
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="p-6">
              <GatewaySettings />
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <NotificationSettings />
            </div>
          )}

          {/* PERSONALIZATION */}
          {activeTab === 'personalization' && (
            <div className="p-6">
              <BrandingSettings />
            </div>
          )}

          {/* SYSTEM */}
          {activeTab === 'system' && (
            <div className="p-6">
              <SystemSettings />
            </div>
          )}

          {/* INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Plug size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Intégrations' : 'Integrations'}
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#111827]">IA (Gemini)</h3>
                      <p className="text-sm text-[#6B7280]">
                        {lang === 'fr' ? 'Analyse intelligente des notes' : 'Grade analysis'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIntegrationData(prev => ({ ...prev, aiEnabled: !prev.aiEnabled }))}
                      className={`w-12 h-6 rounded-full transition-colors ${integrationData.aiEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        integrationData.aiEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  {integrationData.aiEnabled && (
                    <input
                      type="password"
                      placeholder={lang === 'fr' ? 'Clé API Google' : 'Google API Key'}
                      value={integrationData.apiKeys.ai}
                      onChange={e => setIntegrationData(prev => ({ ...prev, apiKeys: { ...prev.apiKeys, ai: e.target.value } }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none"
                    />
                  )}
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#111827]">OpenStreetMap</h3>
                      <p className="text-sm text-[#6B7280]">
                        {lang === 'fr' ? 'Cartographie transport' : 'Transport mapping'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIntegrationData(prev => ({ ...prev, mapsEnabled: !prev.mapsEnabled }))}
                      className={`w-12 h-6 rounded-full transition-colors ${integrationData.mapsEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        integrationData.mapsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#111827]">Money Fusion</h3>
                      <p className="text-sm text-[#6B7280]">
                        {lang === 'fr' ? 'Paiements Mobile Money et Carte bancaire' : 'Mobile Money and Bank Card payments'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIntegrationData(prev => ({ ...prev, gatewayEnabled: !prev.gatewayEnabled }))}
                      className={`w-12 h-6 rounded-full transition-colors ${integrationData.gatewayEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        integrationData.gatewayEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  {integrationData.gatewayEnabled && (
                    <input
                      type="password"
                      placeholder={lang === 'fr' ? 'Clé API' : 'API Key'}
                      value={integrationData.apiKeys.gateway}
                      onChange={e => setIntegrationData(prev => ({ ...prev, apiKeys: { ...prev.apiKeys, gateway: e.target.value } }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleSave('integrations')}
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {lang === 'fr' ? 'Enregistrer' : 'Save'}
                </button>
              </div>
            </div>
          )}

          {/* BACKUP */}
          {activeTab === 'backup' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                <Database size={20} className="text-[#4F46E5]" />
                {lang === 'fr' ? 'Sauvegarde & Restauration' : 'Backup & Restore'}
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-3">{lang === 'fr' ? 'Exporter les données' : 'Export Data'}</h3>
                  <p className="text-sm text-slate-600 mb-4">{lang === 'fr' ? 'Téléchargez une copie complète des données de votre établissement au format JSON.' : 'Download a complete copy of your school data in JSON format.'}</p>
                  <button onClick={exportData} disabled={saving} className="flex items-center gap-2 px-5 py-3 bg-[#4F46E5] text-white rounded-xl font-medium hover:bg-[#4338ca] disabled:opacity-50">
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    {lang === 'fr' ? 'Exporter (JSON)' : 'Export (JSON)'}
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#111827] mb-3">{lang === 'fr' ? 'Dernières sauvegardes' : 'Recent Backups'}</h3>
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock size={14} />
                    {lang === 'fr' ? 'Les sauvegardes automatiques sont effectuées quotidiennement par Supabase.' : 'Automatic backups are performed daily by Supabase.'}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">{lang === 'fr' ? 'Restauration' : 'Restore'}</p>
                      <p className="text-xs text-amber-600 mt-1">{lang === 'fr' ? 'Pour restaurer une sauvegarde, contactez le support technique avec votre fichier de sauvegarde.' : 'To restore a backup, contact technical support with your backup file.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleLayout>
  );
}