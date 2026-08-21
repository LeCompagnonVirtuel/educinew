'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import { getSupabase } from '@/lib/api/shared';
import {
  Languages, Bell, Shield, Headphones,
  BookOpen, MessageCircle, Edit, ChevronRight, LogOut,
} from 'lucide-react';

export default function TeacherSettingsPage() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const [classReminders, setClassReminders] = useState(true);
  const [gradeReports, setGradeReports] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const tp = t.teacherProfile;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      if (logout) logout();
      router.push('/login');
    } catch (e: any) {
      showToast(e.message || 'Erreur de déconnexion');
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      showToast('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setPasswordLoading(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showToast('Mot de passe modifié avec succès');
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (e: any) {
      showToast(e.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleTutorials = () => {
    window.open('https://docs.educi.ci', '_blank');
  };

  const handleChat = () => {
    router.push('/messages');
  };

  return (
    <RoleLayout role="teacher" breadcrumbs={[{ label: lang === 'fr' ? 'Enseignant' : 'Teacher' }, { label: tp.title }]}>
      {/* Profile Section */}
      <section className="mb-10 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-[32px] overflow-hidden bg-[#edeeef] shadow-sm mx-auto">
            <div className="w-full h-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] font-bold text-4xl">
              {getInitials(user?.name || 'T')}
            </div>
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#3525cd] p-2.5 rounded-2xl text-white shadow-lg active:scale-90 transition-transform">
            <Edit size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#191c1d] mb-1">
          {user?.name || 'Kouassi Amenan'}
        </h2>
        <p className="text-[#464555] font-medium opacity-80 uppercase tracking-widest text-[11px] mb-4">
          {tp.mathematicsSpecialist}
        </p>
        <div className="inline-flex items-center px-4 py-1.5 bg-[#f3f4f5] rounded-full">
          <span className="text-xs font-semibold text-[#3525cd]/70 mr-2">ID:</span>
          <span className="text-xs font-bold text-[#191c1d]">
            {user?.id?.slice(0, 8)?.toUpperCase() || 'ED-7729-2024'}
          </span>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {/* Language */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#3525cd]">
                <Languages size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#191c1d]">Langue</h3>
                <p className="text-xs text-[#464555]">Interface en français</p>
              </div>
            </div>
            <div className="flex bg-[#edeeef] p-1 rounded-lg">
              <div className="px-4 py-1.5 text-xs font-bold rounded-md bg-white text-[#3525cd] shadow-sm">
                FR
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#191c1d]">{tp.notifications}</h3>
              <p className="text-xs text-[#464555]">{tp.manageAlerts}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-[#191c1d]">{tp.classReminders}</span>
              <button
                onClick={() => setClassReminders(!classReminders)}
                className={`w-10 h-5 rounded-full relative transition-colors ${classReminders ? 'bg-[#3525cd]' : 'bg-[#c7c4d8]/30'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${classReminders ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-[#191c1d]">{tp.gradeReports}</span>
              <button
                onClick={() => setGradeReports(!gradeReports)}
                className={`w-10 h-5 rounded-full relative transition-colors ${gradeReports ? 'bg-[#3525cd]' : 'bg-[#c7c4d8]/30'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${gradeReports ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#191c1d]">{tp.accountSecurity}</h3>
              <p className="text-xs text-[#464555]">{tp.passwordBiometric}</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => setShowPasswordModal(true)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#f3f4f5] transition-colors group">
              <span className="text-sm font-medium text-[#191c1d]">{tp.changePassword}</span>
              <ChevronRight size={18} className="text-[#464555] group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="w-full flex items-center justify-between p-3 rounded-lg">
              <span className="text-sm font-medium text-[#191c1d]">{tp.faceIdLogin}</span>
              <span className="text-xs font-bold text-[#3525cd]">{tp.enabled}</span>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Headphones size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#191c1d]">{tp.helpSupport}</h3>
              <p className="text-xs text-[#464555]">{tp.contactOrFAQ}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleTutorials} className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#c7c4d8]/10 hover:bg-[#f3f4f5] transition-colors">
              <BookOpen size={24} className="text-[#3525cd] mb-2" />
              <span className="text-xs font-bold">{tp.tutorials}</span>
            </button>
            <button onClick={handleChat} className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#c7c4d8]/10 hover:bg-[#f3f4f5] transition-colors">
              <MessageCircle size={24} className="text-[#3525cd] mb-2" />
              <span className="text-xs font-bold">{tp.directChat}</span>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <button onClick={handleLogout} className="w-full py-5 rounded-2xl bg-white text-[#ba1a1a] font-extrabold tracking-tight active:scale-95 transition-transform duration-150 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <LogOut size={20} />
          {tp.logout}
        </button>

        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowPasswordModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-[#191c1d] mb-4">{tp.changePassword}</h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-primary/40 outline-none text-sm mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">Annuler</button>
                <button onClick={handleChangePassword} disabled={passwordLoading} className="flex-1 py-3 bg-[#3525cd] text-white font-semibold rounded-xl hover:bg-[#4f46e5] disabled:opacity-50">
                  {passwordLoading ? 'Changement...' : 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed top-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg text-sm font-semibold bg-green-500 text-white">
            {toast}
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
