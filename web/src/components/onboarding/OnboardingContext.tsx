'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { getSupabase } from '@/lib/api/shared';

export interface OnboardingData {
  personal: {
    civility: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    photoUrl: string;
    phone: string;
    phoneSecondary: string;
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
    authorizationNumber: string;
    ministry: string;
    creationDate: string;
    taxNumber: string;
    rccm: string;
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
    twitter: string;
    youtube: string;
  };
  branding: {
    logoUrl: string;
    logoMonoUrl: string;
    faviconUrl: string;
    stampUrl: string;
    signatureUrl: string;
    digitalSignatureUrl: string;
    displayName: string;
    slogan: string;
    motto: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    buttonColor: string;
    dashboardColor: string;
    theme: string;
    typography: string;
  };
  academic: {
    academicYear: string;
    cycles: string[];
    levels: string[];
    classes: string[];
    series: string[];
    subjects: { name: string; coefficient: number }[];
    gradingSystem: string;
    periodType: string;
  };
  modules: string[];
  payments: {
    moneyFusionUrl: string;
    mobileMoney: boolean;
    bankCards: boolean;
    transfers: boolean;
    cash: boolean;
  };
  notifications: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled: boolean;
    whatsappEnabled: boolean;
  };
  security: {
    maxAdmins: number;
    allowDelegation: boolean;
    securityLevel: string;
    twoFactorEnabled: boolean;
  };
}

const defaultData: OnboardingData = {
  personal: {
    civility: '', lastName: '', firstName: '', dateOfBirth: '', gender: '',
    nationality: 'Ivoirienne', photoUrl: '', phone: '', phoneSecondary: '',
    whatsapp: '', email: '', password: '', confirmPassword: '',
    securityQuestion: '', securityAnswer: '',
  },
  school: {
    officialName: '', commercialName: '', acronym: '', type: 'COLLEGE',
    visibility: 'PRIVE', authorizationNumber: '', ministry: '',
    creationDate: '', taxNumber: '', rccm: '',
  },
  location: {
    country: 'Côte d\'Ivoire', region: '', city: '', commune: '',
    quarter: '', fullAddress: '', postalCode: '', latitude: 5.3600, longitude: -4.0083,
  },
  contacts: {
    phonePrimary: '', phoneSecondary: '', whatsapp: '', emailPrimary: '',
    emailAdmin: '', website: '', facebook: '', linkedin: '',
    instagram: '', twitter: '', youtube: '',
  },
  branding: {
    logoUrl: '', logoMonoUrl: '', faviconUrl: '', stampUrl: '',
    signatureUrl: '', digitalSignatureUrl: '', displayName: '', slogan: '',
    motto: '', description: '', primaryColor: '#4F46E5', secondaryColor: '#10B981',
    accentColor: '#F59E0B', buttonColor: '#4F46E5', dashboardColor: '#F9FAFB',
    theme: 'light', typography: 'Inter',
  },
  academic: {
    academicYear: '', cycles: [], levels: [], classes: [], series: [],
    subjects: [], gradingSystem: '20', periodType: 'TRIMESTRE',
  },
  modules: [
    'Élèves', 'Enseignants', 'Parents', 'Classes', 'Notes',
    'Bulletins', 'Pointage QR Code', 'Présences', 'Paiements',
    'Transport', 'Messagerie', 'Notifications', 'EduCI AI', 'Rapports',
    'Emploi du temps',
  ],
  payments: {
    moneyFusionUrl: '', mobileMoney: true, bankCards: false,
    transfers: false, cash: true,
  },
  notifications: {
    emailEnabled: true, pushEnabled: true, smsEnabled: false, whatsappEnabled: false,
  },
  security: {
    maxAdmins: 3, allowDelegation: true, securityLevel: 'standard', twoFactorEnabled: false,
  },
};

const STEPS = [
  { id: 'welcome', label: 'Bienvenue', icon: '🎉' },
  { id: 'personal', label: 'Informations personnelles', icon: '👤' },
  { id: 'school', label: 'Établissement', icon: '🏫' },
  { id: 'location', label: 'Localisation', icon: '📍' },
  { id: 'contacts', label: 'Contacts', icon: '📞' },
  { id: 'branding', label: 'Identité visuelle', icon: '🎨' },
  { id: 'academic', label: 'Configuration académique', icon: '📚' },
  { id: 'modules', label: 'Modules', icon: '🧩' },
  { id: 'payments', label: 'Paiements', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'security', label: 'Accès & Sécurité', icon: '🔐' },
  { id: 'review', label: 'Vérification', icon: '✅' },
  { id: 'creating', label: 'Création', icon: '⚙️' },
  { id: 'verification', label: 'Confirmation email', icon: '📧' },
  { id: 'launch', label: 'Premier lancement', icon: '🚀' },
];

type SyncStatus = 'saved' | 'saving' | 'offline' | 'error';

interface OnboardingContextType {
  currentStep: number;
  data: OnboardingData;
  steps: typeof STEPS;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updatePersonal: (data: Partial<OnboardingData['personal']>) => void;
  updateSchool: (data: Partial<OnboardingData['school']>) => void;
  updateLocation: (data: Partial<OnboardingData['location']>) => void;
  updateContacts: (data: Partial<OnboardingData['contacts']>) => void;
  updateBranding: (data: Partial<OnboardingData['branding']>) => void;
  updateAcademic: (data: Partial<OnboardingData['academic']>) => void;
  setModules: (modules: string[]) => void;
  updatePayments: (data: Partial<OnboardingData['payments']>) => void;
  updateNotifications: (data: Partial<OnboardingData['notifications']>) => void;
  updateSecurity: (data: Partial<OnboardingData['security']>) => void;
  progress: number;
  isStepCompleted: (step: number) => boolean;
  syncStatus: SyncStatus;
  lastSaved: string;
  draftId: string | null;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'educi_onboarding';
const DRAFT_KEY = 'educi_onboarding_draft_id';

function stripSensitiveData(data: OnboardingData): OnboardingData {
  const { password: _p, confirmPassword: _cp, ...safe } = data.personal;
  return { ...data, personal: safe as OnboardingData['personal'] };
}

function loadSavedData(): { step: number; data: OnboardingData } | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, data: stripSensitiveData(parsed.data) };
    }
  } catch {}
  return null;
}

function saveDataLocal(step: number, data: OnboardingData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data: stripSensitiveData(data), updated_at: new Date().toISOString() }));
  } catch {}
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const saved = loadSavedData();
  const [currentStep, setCurrentStep] = useState(saved?.step ?? 0);
  const [data, setData] = useState<OnboardingData>(saved?.data ?? defaultData);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('saved');
  const [lastSaved, setLastSaved] = useState('');
  const [draftId, setDraftId] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem(DRAFT_KEY) : null
  );
  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from Supabase on mount
  useEffect(() => {
    async function hydrate() {
      try {
        const supabase = getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setHydrated(true); return; }

        const { data: drafts } = await supabase
          .from('onboarding_drafts')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1);

        if (drafts && drafts.length > 0) {
          const draft = drafts[0];
          const savedLocal = loadSavedData();
          const localTs = savedLocal ? new Date((savedLocal as any).updated_at || 0).getTime() : 0;
          const remoteTs = new Date(draft.updated_at).getTime();

          if (remoteTs >= localTs) {
            setCurrentStep(draft.step || 0);
            setData({ ...defaultData, ...(draft.data || {}), personal: { ...defaultData.personal, ...((draft.data || {}) as any).personal, password: '', confirmPassword: '' } });
            setDraftId(draft.id);
            localStorage.setItem(DRAFT_KEY, draft.id);
          }
        }
      } catch {}
      setHydrated(true);
    }
    hydrate();
  }, []);

  // Support URL ?step=N override
  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(window.location.search);
    const stepParam = params.get('step');
    if (stepParam !== null) {
      const step = parseInt(stepParam, 10);
      if (!isNaN(step) && step >= 0 && step < STEPS.length) {
        setCurrentStep(step);
      }
    }
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveDataLocal(currentStep, data);
  }, [currentStep, data, hydrated]);

  const saveToSupabase = useCallback(async (step: number, payload: OnboardingData) => {
    try {
      setSyncStatus('saving');
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      const safePayload = stripSensitiveData(payload);
      const isCompleted = step >= STEPS.length - 1;
      const draftPayload = {
        step,
        data: safePayload,
        email: safePayload.personal.email || null,
        school_name: safePayload.school.officialName || null,
        completed: isCompleted,
        updated_at: new Date().toISOString(),
        ...(user ? { user_id: user.id } : {}),
      };

      if (draftId) {
        await supabase.from('onboarding_drafts').update(draftPayload).eq('id', draftId);
      } else {
        const { data: inserted } = await supabase.from('onboarding_drafts').insert(draftPayload).select('id').single();
        if (inserted) {
          setDraftId(inserted.id);
          localStorage.setItem(DRAFT_KEY, inserted.id);
        }
      }
      setSyncStatus('saved');
      setLastSaved(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      setSyncStatus('error');
    }
  }, [draftId]);

  const debouncedSave = useCallback((step: number, payload: OnboardingData) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveToSupabase(step, payload);
    }, 2000);
  }, [saveToSupabase]);

  const setStep = useCallback((step: number) => {
    if (step >= 0 && step < STEPS.length) setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, STEPS.length - 1);
      return next;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const updatePersonal = useCallback((d: Partial<OnboardingData['personal']>) => {
    setData(prev => {
      const next = { ...prev, personal: { ...prev.personal, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateSchool = useCallback((d: Partial<OnboardingData['school']>) => {
    setData(prev => {
      const next = { ...prev, school: { ...prev.school, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateLocation = useCallback((d: Partial<OnboardingData['location']>) => {
    setData(prev => {
      const next = { ...prev, location: { ...prev.location, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateContacts = useCallback((d: Partial<OnboardingData['contacts']>) => {
    setData(prev => {
      const next = { ...prev, contacts: { ...prev.contacts, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateBranding = useCallback((d: Partial<OnboardingData['branding']>) => {
    setData(prev => {
      const next = { ...prev, branding: { ...prev.branding, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateAcademic = useCallback((d: Partial<OnboardingData['academic']>) => {
    setData(prev => {
      const next = { ...prev, academic: { ...prev.academic, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const setModules = useCallback((modules: string[]) => {
    setData(prev => {
      const next = { ...prev, modules };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updatePayments = useCallback((d: Partial<OnboardingData['payments']>) => {
    setData(prev => {
      const next = { ...prev, payments: { ...prev.payments, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateNotifications = useCallback((d: Partial<OnboardingData['notifications']>) => {
    setData(prev => {
      const next = { ...prev, notifications: { ...prev.notifications, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const updateSecurity = useCallback((d: Partial<OnboardingData['security']>) => {
    setData(prev => {
      const next = { ...prev, security: { ...prev.security, ...d } };
      debouncedSave(currentStep, next);
      return next;
    });
  }, [currentStep, debouncedSave]);

  const progress = Math.round((currentStep / (STEPS.length - 1)) * 100);

  const isStepCompleted = useCallback((step: number) => {
    return step < currentStep;
  }, [currentStep]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep, data, steps: STEPS, setStep, nextStep, prevStep,
        updatePersonal, updateSchool, updateLocation, updateContacts,
        updateBranding, updateAcademic, setModules, updatePayments,
        updateNotifications, updateSecurity, progress, isStepCompleted,
        syncStatus, lastSaved, draftId,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
}

export { STEPS };
