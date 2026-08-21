'use client';

import { useState, useEffect, useRef } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { useAuth } from '@/hooks/useAuth';
import { useSchool } from '@/hooks/useSchool';
import { useBranding } from '@/components/branding/BrandingProvider';
import { getSupabase } from '@/lib/api/shared';
import Image from 'next/image';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import {
  User, Mail, Phone, Shield, Building, Calendar, Clock,
  Save, Loader2, CheckCircle, AlertTriangle, Eye, EyeOff,
  Key, Globe, Palette, Bell, Download, Trash2, LogOut,
  Camera, MapPin, BookOpen, Award, Hash,
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  TEACHER: 'Enseignant',
  PARENT: 'Parent',
  STUDENT: 'Élève',
  COMPTABLE: 'Comptable',
  SECRETAIRE: 'Secrétaire',
  CENSEUR: 'Censeur',
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { school } = useSchool();
  const { branding } = useBranding();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [extraData, setExtraData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
      setPhotoUrl(user.photoUrl || null);
    }
  }, [user]);

  useEffect(() => {
    async function loadExtra() {
      if (!user?.id) return;
      const supabase = getSupabase();

      if (user.role === 'STUDENT') {
        const { data } = await supabase
          .from('students')
          .select('matricule, date_of_birth, gender, class:classes(name, level)')
          .eq('user_id', user.id)
          .single();
        setExtraData(data);
      } else if (user.role === 'TEACHER') {
        const { data } = await supabase
          .from('teachers')
          .select('id, subject:subjects(name)')
          .eq('user_id', user.id)
          .single();
        setExtraData(data);
      } else if (user.role === 'PARENT') {
        const { data } = await supabase
          .from('parents')
          .select('id, profession, relationship')
          .eq('user_id', user.id)
          .single();
        setExtraData(data);
      }
    }
    loadExtra();
  }, [user?.id, user?.role]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const supabase = getSupabase();
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name: profileForm.name, phone: profileForm.phone },
      });
      if (updateError) throw updateError;
      if (user?.id) {
        await supabase.from('users').update({ name: profileForm.name, phone: profileForm.phone }).eq('id', user.id);
      }
      setSuccess('Profil mis à jour avec succès.');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour.');
    }
    setLoading(false);
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas.');
      }
      if (passwordForm.newPassword.length < 8) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });
      if (error) throw error;
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Mot de passe modifié avec succès.');
    } catch (err: any) {
      setError(err.message || 'Erreur lors du changement de mot de passe.');
    }
    setLoading(false);
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setUploadingPhoto(true);
    setError('');
    try {
      const supabase = getSupabase();
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { photo_url: publicUrl },
      });
      if (updateError) throw updateError;

      await supabase.from('users').update({ photo_url: publicUrl }).eq('id', user.id);

      setPhotoUrl(publicUrl);
      setSuccess('Photo de profil mise à jour.');
    } catch (err: any) {
      setError(err.message || 'Erreur lors du téléchargement de la photo.');
    }
    setUploadingPhoto(false);
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Key },
    { id: 'school', label: 'Établissement', icon: Building },
  ];

  return (
    <RoleLayout role={(user?.role?.toLowerCase() as any) || 'admin'} breadcrumbs={[{ label: 'Mon Profil' }]}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[var(--color-primary,#4F46E5)] to-[var(--color-secondary,#10B981)]" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              <div className="relative">
                {photoUrl ? (
                  <Image src={photoUrl} alt={user?.name || ''} width={96} height={96} unoptimized className="rounded-full object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[var(--color-primary,#4F46E5)] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  {uploadingPhoto ? (
                    <Loader2 size={14} className="text-slate-600 animate-spin" />
                  ) : (
                    <Camera size={14} className="text-slate-600" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
                <p className="text-slate-500">{roleLabels[user?.role || ''] || user?.role}</p>
                {school?.name && (
                  <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                    <Building size={12} /> {school.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[var(--color-primary,#4F46E5)] shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <CheckCircle size={16} /> {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Informations personnelles</h2>

            {/* Photo Upload Section */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="relative shrink-0">
                {photoUrl ? (
                  <Image src={photoUrl} alt={user?.name || ''} width={64} height={64} unoptimized className="rounded-full object-cover border-2 border-slate-200" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary,#4F46E5)] flex items-center justify-center text-white text-xl font-bold border-2 border-slate-200">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">Photo de profil</p>
                <p className="text-xs text-slate-500 mb-2">JPG, PNG ou GIF. 2 Mo maximum.</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                  {uploadingPhoto ? 'Envoi en cours...' : 'Changer la photo'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nom complet</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={profileForm.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <SmartPhoneInput
                  value={profileForm.phone}
                  onChange={(value) => setProfileForm({ ...profileForm, phone: value })}
                  label="Téléphone"
                  countryCode="CI"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Rôle</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={roleLabels[user?.role || ''] || user?.role || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Role-specific info */}
            {user?.role === 'STUDENT' && extraData && (
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Informations scolaires</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500">Matricule</p>
                    <p className="font-semibold text-slate-900 font-mono">{extraData.matricule || '—'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500">Classe</p>
                    <p className="font-semibold text-slate-900">{extraData.class?.name || '—'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500">Niveau</p>
                    <p className="font-semibold text-slate-900">{extraData.class?.level || '—'}</p>
                  </div>
                </div>
              </div>
            )}

            {user?.role === 'TEACHER' && extraData && (
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Informations professionnelles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500">Matière principale</p>
                    <p className="font-semibold text-slate-900">{extraData.subject?.name || '—'}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs text-slate-500">ID Enseignant</p>
                    <p className="font-semibold text-slate-900 font-mono text-xs">{extraData.id || '—'}</p>
                  </div>
                </div>
              </div>
            )}

            {user?.role === 'PARENT' && extraData && (
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Informations parent</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extraData.profession && (
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500">Profession</p>
                      <p className="font-semibold text-slate-900">{extraData.profession}</p>
                    </div>
                  )}
                  {extraData.relationship && (
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-500">Lien de parenté</p>
                      <p className="font-semibold text-slate-900">{extraData.relationship}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Changer le mot de passe</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Nouveau mot de passe</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none transition-all text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Confirmer le mot de passe</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[var(--color-primary,#4F46E5)] focus:ring-2 focus:ring-[var(--color-primary,#4F46E5)]/20 outline-none transition-all text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loading || !passwordForm.newPassword || !passwordForm.confirmPassword}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary,#4F46E5)] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
                Modifier le mot de passe
              </button>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Informations du compte</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">ID Utilisateur</p>
                  <p className="font-mono text-xs text-slate-700 break-all">{user?.id}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500">Membre depuis</p>
                  <p className="font-semibold text-slate-900 text-sm">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* School Tab */}
        {activeTab === 'school' && school && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Mon établissement</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Nom</p>
                <p className="font-semibold text-slate-900">{school.name}</p>
              </div>
              {school.code && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Code</p>
                  <p className="font-semibold text-slate-900 font-mono">{school.code}</p>
                </div>
              )}
              {school.address && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Adresse</p>
                  <p className="font-semibold text-slate-900">{school.address}</p>
                </div>
              )}
              {school.city && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Ville</p>
                  <p className="font-semibold text-slate-900">{school.city}</p>
                </div>
              )}
              {school.phone && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Téléphone</p>
                  <p className="font-semibold text-slate-900">{school.phone}</p>
                </div>
              )}
              {school.email && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <p className="font-semibold text-slate-900">{school.email}</p>
                </div>
              )}
              {school.academic_year && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Année scolaire</p>
                  <p className="font-semibold text-slate-900">{school.academic_year}</p>
                </div>
              )}
              {school.slogan && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Slogan</p>
                  <p className="font-semibold text-slate-900 italic">"{school.slogan}"</p>
                </div>
              )}
            </div>

            {/* Branding Preview */}
            {branding && (
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Identité visuelle</h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: branding.color_primary }} title="Primaire" />
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: branding.color_secondary }} title="Secondaire" />
                    <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: branding.color_accent }} title="Accent" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Palette de couleurs</p>
                    <p className="text-xs text-slate-400 font-mono">{branding.color_primary} / {branding.color_secondary} / {branding.color_accent}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleLayout>
  );
}
