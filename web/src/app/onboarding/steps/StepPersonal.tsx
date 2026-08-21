'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import StepCard from '@/components/onboarding/StepCard';
import Image from 'next/image';
import { User, Mail, Lock, Shield, Calendar, Eye, EyeOff, Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/api/shared';
import SmartPhoneInput from '@/components/ui/SmartPhoneInput';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { africanCountries, getCountryByNameFr } from '@/lib/data/african-countries';

const inputClass = (field: string, focused: string, error?: boolean) =>
  `w-full px-4 py-3.5 bg-white rounded-xl border-2 transition-all duration-300 outline-none text-slate-900 text-[15px]
   ${error ? 'border-red-400 bg-red-50/30' : focused === field ? 'border-[#4F46E5] bg-white shadow-sm shadow-[#4F46E5]/5' : 'border-slate-200 hover:border-slate-300'}`;

const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';

export default function StepPersonal() {
  const { data, updatePersonal, nextStep } = useOnboarding();
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [phoneStatus, setPhoneStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const photoRef = useRef<HTMLInputElement>(null);
  const emailTimer = useRef<NodeJS.Timeout | null>(null);
  const phoneTimer = useRef<NodeJS.Timeout | null>(null);

  const nationalities = useMemo(() => africanCountries.map(c => c.nameFr), []);
  const country = useMemo(() => getCountryByNameFr(data.location?.country || ''), [data.location?.country]);
  const countryCode = country?.code || 'CI';

  const checkEmailUnique = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) { setEmailStatus('idle'); return; }
    setEmailStatus('checking');
    try {
      const supabase = getSupabase();
      const { data: existing } = await supabase.from('users').select('id').eq('email', email).limit(1);
      setEmailStatus(existing && existing.length > 0 ? 'taken' : 'available');
    } catch {
      setEmailStatus('idle');
    }
  }, []);

  const checkPhoneUnique = useCallback(async (phone: string) => {
    if (!phone || phone.length < 8) { setPhoneStatus('idle'); return; }
    setPhoneStatus('checking');
    try {
      const supabase = getSupabase();
      const { data: existing } = await supabase.from('users').select('id').eq('phone', phone).limit(1);
      setPhoneStatus(existing && existing.length > 0 ? 'taken' : 'available');
    } catch {
      setPhoneStatus('idle');
    }
  }, []);

  const handleEmailChange = (email: string) => {
    updatePersonal({ email });
    if (emailTimer.current) clearTimeout(emailTimer.current);
    emailTimer.current = setTimeout(() => checkEmailUnique(email), 800);
  };

  const handlePhoneChange = (phone: string) => {
    updatePersonal({ phone });
    if (phoneTimer.current) clearTimeout(phoneTimer.current);
    phoneTimer.current = setTimeout(() => checkPhoneUnique(phone), 800);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updatePersonal({ photoUrl: url });
    }
  };

  const getPasswordStrength = (): { level: number; label: string; color: string } => {
    const pwd = data.personal.password;
    if (!pwd) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { level: score, label: 'Faible', color: 'bg-red-500' };
    if (score <= 3) return { level: score, label: 'Moyen', color: 'bg-amber-500' };
    return { level: score, label: 'Fort', color: 'bg-[#10B981]' };
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.personal.lastName.trim()) errs.lastName = 'Le nom est requis';
    if (!data.personal.firstName.trim()) errs.firstName = 'Le prénom est requis';
    if (!data.personal.email.includes('@')) errs.email = 'Email invalide';
    if (emailStatus === 'taken') errs.email = 'Cet email est déjà utilisé';
    if (data.personal.password.length < 8) errs.password = 'Minimum 8 caractères';
    if (data.personal.password !== data.personal.confirmPassword) errs.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (!data.personal.phone.trim()) errs.phone = 'Le téléphone est requis';
    if (phoneStatus === 'taken') errs.phone = 'Ce numéro est déjà utilisé';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  const pwdStrength = getPasswordStrength();

  return (
    <StepCard
      title="Vos informations"
      subtitle="En tant qu'administrateur principal, vos informations serviront à créer votre compte sécurisé."
      icon="👤"
      onNext={handleNext}
      canProceed={!!(
        data.personal.lastName && data.personal.firstName &&
        data.personal.email && data.personal.password &&
        data.personal.phone && emailStatus !== 'taken'
      )}
    >
      <div className="space-y-5">
        {/* Photo Upload */}
        <div className="flex items-center gap-5 mb-2">
          <div
            onClick={() => photoRef.current?.click()}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-[#4F46E5]/50 hover:bg-[#4F46E5]/5 transition-all overflow-hidden group"
          >
            {data.personal.photoUrl ? (
              <Image src={data.personal.photoUrl} alt="" width={80} height={80} unoptimized className="w-full h-full object-cover" />
            ) : (
              <Camera size={24} className="text-slate-300 group-hover:text-[#4F46E5] transition-colors" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Photo de profil</p>
            <p className="text-xs text-slate-400 mt-0.5">Optionnelle · JPG, PNG (max 5 Mo)</p>
          </div>
          <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
        </div>

        {/* Civility + Names */}
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className={labelClass}>Civilité</label>
            <select
              value={data.personal.civility}
              onChange={(e) => updatePersonal({ civility: e.target.value })}
              className={inputClass('civility', focused)}
              onFocus={() => setFocused('civility')} onBlur={() => setFocused('')}
            >
              <option value="">—</option>
              <option value="M">M.</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Nom *</label>
            <input
              value={data.personal.lastName}
              onChange={(e) => updatePersonal({ lastName: e.target.value })}
              onFocus={() => setFocused('lastName')} onBlur={() => setFocused('')}
              className={inputClass('lastName', focused, !!errors.lastName)}
              placeholder="KOUASSI"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className={labelClass}>Prénom *</label>
            <input
              value={data.personal.firstName}
              onChange={(e) => updatePersonal({ firstName: e.target.value })}
              onFocus={() => setFocused('firstName')} onBlur={() => setFocused('')}
              className={inputClass('firstName', focused, !!errors.firstName)}
              placeholder="Jean"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
        </div>

        {/* DOB + Gender + Nationality */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Date de naissance</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={data.personal.dateOfBirth}
                onChange={(e) => updatePersonal({ dateOfBirth: e.target.value })}
                onFocus={() => setFocused('dob')} onBlur={() => setFocused('')}
                className={inputClass('dob', focused) + ' pl-11'}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Sexe</label>
            <select
              value={data.personal.gender}
              onChange={(e) => updatePersonal({ gender: e.target.value })}
              className={inputClass('gender', focused)}
              onFocus={() => setFocused('gender')} onBlur={() => setFocused('')}
            >
              <option value="">—</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Nationalité</label>
            <SearchableSelect
              options={nationalities}
              value={data.personal.nationality || ''}
              onChange={(v) => updatePersonal({ nationality: v })}
              placeholder="Sélectionner votre nationalité"
              allowCustom
            />
          </div>
        </div>

        {/* Email with realtime check */}
        <div>
          <label className={labelClass}>Adresse e-mail *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={data.personal.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
              className={inputClass('email', focused, !!errors.email || emailStatus === 'taken') + ' pl-11 pr-10'}
              placeholder="admin@ecole.ci"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {emailStatus === 'checking' && <Loader2 size={16} className="text-slate-400 animate-spin" />}
              {emailStatus === 'available' && <CheckCircle size={16} className="text-[#10B981]" />}
              {emailStatus === 'taken' && <XCircle size={16} className="text-red-500" />}
            </div>
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          {emailStatus === 'available' && <p className="text-xs text-[#10B981] mt-1">Email disponible</p>}
        </div>

        {/* Phone with realtime check */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <SmartPhoneInput
              value={data.personal.phone || ''}
              onChange={(v) => { updatePersonal({ phone: v }); handlePhoneChange(v); }}
              countryCode={countryCode}
              label="Téléphone principal *"
              required
              error={errors.phone}
            />
            {phoneStatus !== 'idle' && (
              <div className="absolute right-3 top-9">
                {phoneStatus === 'checking' && <Loader2 size={14} className="text-slate-400 animate-spin" />}
                {phoneStatus === 'available' && <CheckCircle size={14} className="text-[#10B981]" />}
                {phoneStatus === 'taken' && <XCircle size={14} className="text-red-500" />}
              </div>
            )}
          </div>
          <SmartPhoneInput
            value={data.personal.whatsapp || ''}
            onChange={(v) => updatePersonal({ whatsapp: v })}
            countryCode={countryCode}
            label="WhatsApp"
          />
        </div>

        {/* Password with strength indicator */}
        <div>
          <label className={labelClass}>Mot de passe *</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.personal.password}
                onChange={(e) => updatePersonal({ password: e.target.value })}
                onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                className={inputClass('password', focused, !!errors.password) + ' pl-11 pr-11'}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.personal.confirmPassword}
                onChange={(e) => updatePersonal({ confirmPassword: e.target.value })}
                onFocus={() => setFocused('confirm')} onBlur={() => setFocused('')}
                className={inputClass('confirm', focused, !!errors.confirmPassword) + ' pl-11'}
                placeholder="Confirmer"
              />
            </div>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          {data.personal.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= pwdStrength.level ? pwdStrength.color : 'bg-slate-100'}`} />
                ))}
              </div>
              <span className={`text-[10px] font-semibold ${pwdStrength.level <= 2 ? 'text-red-500' : pwdStrength.level <= 3 ? 'text-amber-500' : 'text-[#10B981]'}`}>
                {pwdStrength.label}
              </span>
            </div>
          )}
        </div>

        {/* Security Question */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Question de sécurité</label>
            <select
              value={data.personal.securityQuestion}
              onChange={(e) => updatePersonal({ securityQuestion: e.target.value })}
              className={inputClass('secQ', focused)}
              onFocus={() => setFocused('secQ')} onBlur={() => setFocused('')}
            >
              <option value="">Choisir...</option>
              <option value="city">Nom de votre ville natale</option>
              <option value="pet">Nom de votre premier animal</option>
              <option value="school">Nom de votre première école</option>
              <option value="mother">Nom de jeune fille de votre mère</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Réponse</label>
            <div className="relative">
              <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={data.personal.securityAnswer}
                onChange={(e) => updatePersonal({ securityAnswer: e.target.value })}
                onFocus={() => setFocused('secA')} onBlur={() => setFocused('')}
                className={inputClass('secA', focused) + ' pl-11'}
                placeholder="Votre réponse"
              />
            </div>
          </div>
        </div>
      </div>
    </StepCard>
  );
}
