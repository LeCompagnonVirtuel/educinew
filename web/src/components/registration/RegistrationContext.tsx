'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';

export interface RegistrationData {
  personal: {
    civility: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    photoUrl: string;
    phone: string;
    whatsapp: string;
    email: string;
    password: string;
    confirmPassword: string;
    securityQuestion: string;
    securityAnswer: string;
  };
  school: {
    officialName: string;
    commercialName: string;
    acronym: string;
    type: string;
    visibility: string;
    ministry: string;
    rccm: string;
    taxNumber: string;
    creationDate: string;
    authorizationNumber: string;
  };
  location: {
    country: string;
    region: string;
    city: string;
    commune: string;
    quarter: string;
    fullAddress: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
  contacts: {
    phonePrimary: string;
    phoneSecondary: string;
    whatsapp: string;
    emailPrimary: string;
    emailAdmin: string;
    website: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  branding: {
    logoUrl: string;
    logoMonoUrl: string;
    iconUrl: string;
    signatureUrl: string;
    stampUrl: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    buttonColor: string;
    dashboardColor: string;
    theme: string;
    typography: string;
    slogan: string;
    motto: string;
    description: string;
  };
  academic: {
    academicYear: string;
    cycles: string[];
    levels: string[];
    classes: string[];
    subjects: { name: string; coefficient: number }[];
    gradingSystem: string;
    periodType: string;
  };
  modules: string[];
  payments: {
    mobileMoney: boolean;
    bankCards: boolean;
    transfers: boolean;
    cash: boolean;
    moneyFusionUrl: string;
  };
  security: {
    maxAdmins: number;
    allowDelegation: boolean;
    securityLevel: string;
    twoFactorEnabled: boolean;
  };
}

const defaultData: RegistrationData = {
  personal: {
    civility: '', lastName: '', firstName: '', dateOfBirth: '', gender: '',
    nationality: 'Ivoirienne', photoUrl: '', phone: '', whatsapp: '',
    email: '', password: '', confirmPassword: '', securityQuestion: '', securityAnswer: '',
  },
  school: {
    officialName: '', commercialName: '', acronym: '', type: 'SECONDARY',
    visibility: 'PRIVE', ministry: '', rccm: '', taxNumber: '',
    creationDate: '', authorizationNumber: '',
  },
  location: {
    country: "Côte d'Ivoire", region: '', city: '', commune: '',
    quarter: '', fullAddress: '', postalCode: '', latitude: 5.3600, longitude: -4.0083,
  },
  contacts: {
    phonePrimary: '', phoneSecondary: '', whatsapp: '', emailPrimary: '',
    emailAdmin: '', website: '', facebook: '', linkedin: '',
    instagram: '', youtube: '', twitter: '',
  },
  branding: {
    logoUrl: '', logoMonoUrl: '', iconUrl: '', signatureUrl: '', stampUrl: '',
    primaryColor: '#4F46E5', secondaryColor: '#10B981', accentColor: '#F59E0B',
    buttonColor: '#4F46E5', dashboardColor: '#F9FAFB', theme: 'light',
    typography: 'Inter', slogan: '', motto: '', description: '',
  },
  academic: {
    academicYear: '', cycles: [], levels: [], classes: [],
    subjects: [], gradingSystem: '20', periodType: 'TRIMESTRE',
  },
  modules: [
    'Élèves', 'Enseignants', 'Parents', 'Classes', 'Notes',
    'Bulletins', 'Pointage QR Code', 'Présences', 'Paiements',
    'Transport', 'Messagerie', 'Notifications', 'EduCI AI', 'Rapports',
    'Emploi du temps',
  ],
  payments: {
    mobileMoney: true, bankCards: false, transfers: false, cash: true,
    moneyFusionUrl: '',
  },
  security: {
    maxAdmins: 3, allowDelegation: true, securityLevel: 'standard', twoFactorEnabled: false,
  },
};

export const REGISTRATION_STEPS = [
  { id: 'welcome', label: 'Bienvenue', icon: 'Sparkles' },
  { id: 'personal', label: 'Propriétaire', icon: 'User' },
  { id: 'school', label: 'Établissement', icon: 'Building2' },
  { id: 'location', label: 'Localisation', icon: 'MapPin' },
  { id: 'contacts', label: 'Contacts', icon: 'Phone' },
  { id: 'branding', label: 'Branding', icon: 'Palette' },
  { id: 'academic', label: 'Académique', icon: 'GraduationCap' },
  { id: 'modules', label: 'Modules', icon: 'Puzzle' },
  { id: 'payments', label: 'Paiements', icon: 'CreditCard' },
  { id: 'security', label: 'Sécurité', icon: 'Shield' },
  { id: 'review', label: 'Résumé', icon: 'CheckCircle' },
  { id: 'submit', label: 'Validation', icon: 'Send' },
] as const;

type SyncStatus = 'saved' | 'saving' | 'offline' | 'error';

interface RegistrationContextType {
  currentStep: number;
  data: RegistrationData;
  steps: typeof REGISTRATION_STEPS;
  sessionToken: string;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePersonal: (data: Partial<RegistrationData['personal']>) => void;
  updateSchool: (data: Partial<RegistrationData['school']>) => void;
  updateLocation: (data: Partial<RegistrationData['location']>) => void;
  updateContacts: (data: Partial<RegistrationData['contacts']>) => void;
  updateBranding: (data: Partial<RegistrationData['branding']>) => void;
  updateAcademic: (data: Partial<RegistrationData['academic']>) => void;
  setModules: (modules: string[]) => void;
  updatePayments: (data: Partial<RegistrationData['payments']>) => void;
  updateSecurity: (data: Partial<RegistrationData['security']>) => void;
  progress: number;
  isStepCompleted: (step: number) => boolean;
  syncStatus: SyncStatus;
  lastSaved: string;
  submitRegistration: () => Promise<{ success: boolean; email?: string; error?: string }>;
  isSubmitting: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const STORAGE_KEY = 'educi_registration';
const SESSION_KEY = 'educi_registration_session';

function generateSessionToken(): string {
  const array = new Uint8Array(48);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    throw new Error('Web Crypto API not available — secure context required');
  }
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function stripForServer(data: RegistrationData): RegistrationData {
  // Strip password only for server-side save (not for submit)
  const { password: _p, confirmPassword: _cp, ...safe } = data.personal;
  return { ...data, personal: safe as RegistrationData['personal'] };
}

function stripForLocalStorage(data: RegistrationData): RegistrationData {
  // SECURITY: Never store password in localStorage — keep it only in React state
  const { password: _p, confirmPassword: _cp, ...safe } = data.personal;
  return { ...data, personal: safe as RegistrationData['personal'] };
}

function loadSaved(): { step: number; data: RegistrationData; sessionToken: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const session = localStorage.getItem(SESSION_KEY);
    if (saved && session) {
      const parsed = JSON.parse(saved);
      return { ...parsed, data: stripForLocalStorage(parsed.data), sessionToken: session };
    }
  } catch {}
  return null;
}

function saveLocal(step: number, data: RegistrationData, sessionToken: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      step,
      data: stripForLocalStorage(data),
      updated_at: new Date().toISOString(),
    }));
    localStorage.setItem(SESSION_KEY, sessionToken);
  } catch {}
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const saved = loadSaved();
  const [sessionToken] = useState(saved?.sessionToken || generateSessionToken());
  const [currentStep, setCurrentStep] = useState(saved?.step ?? 0);
  const [data, setData] = useState<RegistrationData>(saved?.data ?? defaultData);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [lastSaved, setLastSaved] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    saveLocal(currentStep, data, sessionToken);
  }, [currentStep, data, sessionToken]);

  const saveToServer = useCallback(async (step: number, payload: RegistrationData) => {
    try {
      setSyncStatus('saving');
      const response = await fetch('/api/registration/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          step,
          data: stripForServer(payload),
        }),
      });
      if (response.ok) {
        setSyncStatus('saved');
        setLastSaved(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    }
  }, [sessionToken]);

  const debouncedSave = useCallback((step: number, payload: RegistrationData) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveToServer(step, payload), 2000);
  }, [saveToServer]);

  const setStep = useCallback((step: number) => {
    if (step >= 0 && step < REGISTRATION_STEPS.length) setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, REGISTRATION_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const updateData = useCallback(<K extends keyof RegistrationData>(section: K, partial: Partial<RegistrationData[K]>) => {
    setData(prev => {
      const next = { ...prev, [section]: { ...prev[section], ...partial } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updatePersonal = useCallback((d: Partial<RegistrationData['personal']>) => updateData('personal', d), [updateData]);
  const updateSchool = useCallback((d: Partial<RegistrationData['school']>) => updateData('school', d), [updateData]);
  const updateLocation = useCallback((d: Partial<RegistrationData['location']>) => updateData('location', d), [updateData]);
  const updateContacts = useCallback((d: Partial<RegistrationData['contacts']>) => updateData('contacts', d), [updateData]);
  const updateBranding = useCallback((d: Partial<RegistrationData['branding']>) => updateData('branding', d), [updateData]);
  const updateAcademic = useCallback((d: Partial<RegistrationData['academic']>) => updateData('academic', d), [updateData]);
  const setModules = useCallback((modules: string[]) => {
    setData(prev => {
      const next = { ...prev, modules };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);
  const updatePayments = useCallback((d: Partial<RegistrationData['payments']>) => updateData('payments', d), [updateData]);
  const updateSecurity = useCallback((d: Partial<RegistrationData['security']>) => updateData('security', d), [updateData]);

  const progress = Math.round((currentStep / (REGISTRATION_STEPS.length - 1)) * 100);

  const isStepCompleted = useCallback((step: number) => step < currentStep, [currentStep]);

  const submitRegistration = useCallback(async () => {
    setIsSubmitting(true);
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    try {
      // Best-effort save before submit (draft should already exist from auto-save)
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        await fetch('/api/registration/save-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionToken,
            step: currentStep,
            data: stripForServer(data),
          }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
      } catch {
        // Non-blocking: auto-save during form filling should have created the draft
      }

      // Submit with password
      const response = await fetch('/api/registration/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          password: data.personal.password,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(SESSION_KEY);
        } catch {}
        return { success: true, email: result.email };
      }
      return { success: false, error: result.error || 'Erreur lors de la soumission' };
    } catch {
      return { success: false, error: 'Erreur de connexion' };
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionToken, currentStep, data]);

  return (
    <RegistrationContext.Provider
      value={{
        currentStep, data, steps: REGISTRATION_STEPS, sessionToken,
        setStep, nextStep, prevStep,
        updatePersonal, updateSchool, updateLocation, updateContacts,
        updateBranding, updateAcademic, setModules, updatePayments,
        updateSecurity, progress, isStepCompleted,
        syncStatus, lastSaved, submitRegistration, isSubmitting,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error('useRegistration must be used within RegistrationProvider');
  return context;
}
