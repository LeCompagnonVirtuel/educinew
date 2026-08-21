'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Lightbulb, AlertTriangle, CheckCircle,
  Sparkles, Bot, Wand2, ShieldCheck, Palette, CreditCard,
  Bell, BookOpen,
} from 'lucide-react';
import { useOnboarding, STEPS } from './OnboardingContext';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type: 'info' | 'suggestion' | 'warning' | 'success' | 'question';
  timestamp: Date;
  actions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: string;
  value?: unknown;
  icon?: React.ReactNode;
}

const STEP_TIPS: Record<number, (data: ReturnType<typeof useOnboarding>['data']) => Message[]> = {
  0: (data) => [
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Bienvenue ! Je suis **EduCI AI**, votre assistant personnel. Je vais vous accompagner tout au long de l'inscription de votre établissement.",
      type: 'info',
      timestamp: new Date(),
    },
    {
      id: 'welcome-2',
      role: 'assistant',
      content: "Vous pouvez me poser des questions à tout moment. Je suis là pour vous aider !",
      type: 'info',
      timestamp: new Date(),
    },
  ],
  1: (data) => {
    const msgs: Message[] = [
      {
        id: 'personal-intro',
        role: 'assistant',
        content: "Commençons par vos informations personnelles. Ces données seront utilisées pour votre compte administrateur.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    if (data.personal.phone && !/^\+?[0-9]{8,15}$/.test(data.personal.phone.replace(/\s/g, ''))) {
      msgs.push({
        id: 'personal-phone-warn',
        role: 'assistant',
        content: "Le numéro de téléphone semble incorrect. Format recommandé : +225 07 12 34 56 78",
        type: 'warning',
        timestamp: new Date(),
      });
    }
    if (data.personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) {
      msgs.push({
        id: 'personal-email-warn',
        role: 'assistant',
        content: "L'adresse email ne semble pas valide. Vérifiez le format (ex: admin@ecole.com).",
        type: 'warning',
        timestamp: new Date(),
      });
    }
    if (data.personal.password && data.personal.password.length < 8) {
      msgs.push({
        id: 'personal-pwd-warn',
        role: 'assistant',
        content: "Le mot de passe doit contenir au moins 8 caractères pour des raisons de sécurité.",
        type: 'warning',
        timestamp: new Date(),
        actions: [
          { label: 'Suggérer un mot de passe', action: 'suggest-password', icon: <ShieldCheck size={12} /> },
        ],
      });
    }
    if (data.personal.password && data.personal.confirmPassword && data.personal.password !== data.personal.confirmPassword) {
      msgs.push({
        id: 'personal-pwd-match',
        role: 'assistant',
        content: "Les mots de passe ne correspondent pas.",
        type: 'warning',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  2: (data) => {
    const msgs: Message[] = [
      {
        id: 'school-intro',
        role: 'assistant',
        content: "Décrivez-moi votre établissement. Je peux vous suggérer un acronyme automatiquement.",
        type: 'info',
        timestamp: new Date(),
        actions: data.school.officialName && !data.school.acronym
          ? [{ label: 'Générer un acronyme', action: 'generate-acronym', icon: <Wand2 size={12} /> }]
          : undefined,
      },
    ];
    if (data.school.officialName && data.school.officialName.length > 5 && !data.school.acronym) {
      msgs.push({
        id: 'school-acronym-tip',
        role: 'assistant',
        content: `Je peux générer un acronyme pour "${data.school.officialName}". Voulez-vous que je le fasse ?`,
        type: 'suggestion',
        timestamp: new Date(),
        actions: [
          { label: 'Oui, générer', action: 'generate-acronym', icon: <Wand2 size={12} /> },
        ],
      });
    }
    if (data.school.type) {
      const typeLabels: Record<string, string> = {
        ECOLE_MATERNELLE: "École Maternelle",
        ECOLE_PRIMAIRE: "École Primaire",
        COLLEGE: "Collège",
        LYCEE: "Lycée",
        UNIVERSITE: "Université",
        INSTITUT: "Institut",
        FORMATION: "Centre de Formation",
      };
      msgs.push({
        id: 'school-type-info',
        role: 'assistant',
        content: `Type détecté : **${typeLabels[data.school.type] || data.school.type}**. Je vais adapter mes recommandations en conséquence.`,
        type: 'info',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  3: (data) => {
    const msgs: Message[] = [
      {
        id: 'location-intro',
        role: 'assistant',
        content: "Indiquez la localisation de votre établissement. Ces informations seront affichées sur vos documents officiels.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    if (data.location.city && !data.location.region) {
      msgs.push({
        id: 'location-region-tip',
        role: 'assistant',
        content: `Vous avez saisi la ville **${data.location.city}**. N'oubliez pas de préciser la région ou la commune.`,
        type: 'suggestion',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  4: (data) => {
    const msgs: Message[] = [
      {
        id: 'contacts-intro',
        role: 'assistant',
        content: "Ajoutez les coordonnées de contact de votre établissement. Au moins un téléphone et un email sont recommandés.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    if (!data.contacts.phonePrimary && !data.contacts.emailPrimary) {
      msgs.push({
        id: 'contacts-missing',
        role: 'assistant',
        content: "Aucun contact renseigné. Les parents et élèves auront besoin de pouvoir vous joindre.",
        type: 'warning',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  5: (data) => {
    const msgs: Message[] = [
      {
        id: 'branding-intro',
        role: 'assistant',
        content: "C'est ici que votre établissement prend vie ! Je peux vous proposer une palette de couleurs harmonieuse.",
        type: 'info',
        timestamp: new Date(),
        actions: [
          { label: 'Palette Professionnelle', action: 'palette-professional', icon: <Palette size={12} /> },
          { label: 'Palette Créative', action: 'palette-creative', icon: <Palette size={12} /> },
          { label: 'Palette Éducative', action: 'palette-educational', icon: <Palette size={12} /> },
        ],
      },
    ];
    if (data.branding.primaryColor && data.branding.secondaryColor) {
      const contrast = getContrastRatio(data.branding.primaryColor, data.branding.secondaryColor);
      if (contrast < 3) {
        msgs.push({
          id: 'branding-contrast-warn',
          role: 'assistant',
          content: "⚠️ Le contraste entre vos couleurs principale et secondaire est faible. Cela peut affecter la lisibilité. Je recommande un ratio d'au moins 3:1.",
          type: 'warning',
          timestamp: new Date(),
          actions: [
            { label: 'Suggérer une meilleure combinaison', action: 'suggest-colors', icon: <Palette size={12} /> },
          ],
        });
      }
    }
    if (!data.branding.slogan) {
      msgs.push({
        id: 'branding-slogan-tip',
        role: 'assistant',
        content: "Pensez à ajouter un slogan ou devise ! C'est la première chose que les parents et élèves retiennent.",
        type: 'suggestion',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  6: (data) => {
    const msgs: Message[] = [
      {
        id: 'academic-intro',
        role: 'assistant',
        content: "Configurez votre structure académique. Je recommande ces modules pour votre type d'établissement.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    if (data.school.type && !data.academic.gradingSystem) {
      msgs.push({
        id: 'academic-grading-tip',
        role: 'assistant',
        content: "Pour un établissement en Côte d'Ivoire, je recommande l'échelle sur 20 points. Voulez-vous l'appliquer ?",
        type: 'suggestion',
        timestamp: new Date(),
        actions: [
          { label: 'Appliquer /20', action: 'set-grading-20', icon: <BookOpen size={12} /> },
        ],
      });
    }
    if (data.academic.cycles.length === 0) {
      const suggestedCycles = getDefaultCycles(data.school.type);
      if (suggestedCycles.length > 0) {
        msgs.push({
          id: 'academic-cycles-tip',
          role: 'assistant',
          content: `Pour un **${data.school.type}**, je suggère les cycles : ${suggestedCycles.join(', ')}.`,
          type: 'suggestion',
          timestamp: new Date(),
          actions: [
            { label: 'Appliquer ces cycles', action: 'apply-cycles', value: suggestedCycles, icon: <BookOpen size={12} /> },
          ],
        });
      }
    }
    return msgs;
  },
  7: (data) => {
    const msgs: Message[] = [
      {
        id: 'modules-intro',
        role: 'assistant',
        content: "Voici les modules que je recommande pour vous. Vous pouvez les personnaliser.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    const recommended = getRecommendedModules(data.school.type);
    const missing = recommended.filter(m => !data.modules.includes(m));
    if (missing.length > 0) {
      msgs.push({
        id: 'modules-missing',
        role: 'assistant',
        content: `Je recommande d'ajouter ces modules essentiels : **${missing.slice(0, 3).join(', ')}**${missing.length > 3 ? ` et ${missing.length - 3} autres` : ''}.`,
        type: 'suggestion',
        timestamp: new Date(),
        actions: [
          { label: 'Ajouter les recommandés', action: 'add-recommended-modules', value: missing, icon: <Sparkles size={12} /> },
        ],
      });
    }
    return msgs;
  },
  8: (data) => {
    const msgs: Message[] = [
      {
        id: 'payments-intro',
        role: 'assistant',
        content: "Pour les paiements, je recommande **Money Fusion** (Mobile Money, Carte bancaire) pour la Côte d'Ivoire. C'est la solution la plus utilisée et la plus fiable.",
        type: 'info',
        timestamp: new Date(),
        actions: [
          { label: 'Configurer Money Fusion', action: 'setup-moneyfusion', icon: <CreditCard size={12} /> },
        ],
      },
    ];
    if (data.location.country && data.location.country !== "Côte d'Ivoire") {
      msgs.push({
        id: 'payments-country-tip',
        role: 'assistant',
        content: `Pour **${data.location.country}**, je recommande de vérifier les fournisseurs de paiement disponibles dans votre région.`,
        type: 'suggestion',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  9: (data) => {
    const msgs: Message[] = [
      {
        id: 'notifications-intro',
        role: 'assistant',
        content: "Les notifications sont essentielles pour la communication avec les parents et élèves. Je recommande d'activer **Email** et **Push**.",
        type: 'info',
        timestamp: new Date(),
        actions: [
          { label: 'Activer Email + Push', action: 'enable-email-push', icon: <Bell size={12} /> },
        ],
      },
    ];
    if (!data.notifications.emailEnabled && !data.notifications.pushEnabled) {
      msgs.push({
        id: 'notifications-warn',
        role: 'assistant',
        content: "Sans notifications, les parents et élèves ne recevront aucune alerte. C'est fortement déconseillé.",
        type: 'warning',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
  10: (data) => {
    const msgs: Message[] = [
      {
        id: 'security-intro',
        role: 'assistant',
        content: "La sécurité de votre plateforme est essentielle. Vérifiez les paramètres de confidentialité et les permissions.",
        type: 'info',
        timestamp: new Date(),
      },
    ];
    if (data.personal.password && data.personal.password.length < 12) {
      msgs.push({
        id: 'security-pwd-tip',
        role: 'assistant',
        content: "Je recommande un mot de passe d'au moins 12 caractères pour l'administrateur principal.",
        type: 'suggestion',
        timestamp: new Date(),
        actions: [
          { label: 'Suggérer un mot de passe', action: 'suggest-password', icon: <ShieldCheck size={12} /> },
        ],
      });
    }
    return msgs;
  },
  11: (data) => {
    const warnings: string[] = [];
    if (!data.personal.email) warnings.push("Email administrateur manquant");
    if (!data.school.officialName) warnings.push("Nom de l'établissement manquant");
    if (!data.school.acronym) warnings.push("Acronyme non défini");
    if (!data.branding.primaryColor) warnings.push("Couleur principale non définie");
    if (data.modules.length === 0) warnings.push("Aucun module sélectionné");
    if (!data.payments.moneyFusionUrl) warnings.push("URL Money Fusion non configurée");

    const msgs: Message[] = [
      {
        id: 'review-intro',
        role: 'assistant',
        content: warnings.length === 0
          ? "Excellent ! Voici le résumé de votre configuration. Tout est prêt pour la création !"
          : `Voici le résumé de votre configuration. **${warnings.length} point(s)** nécessitent votre attention.`,
        type: warnings.length === 0 ? 'success' : 'warning',
        timestamp: new Date(),
      },
    ];
    if (warnings.length > 0) {
      msgs.push({
        id: 'review-warnings',
        role: 'assistant',
        content: warnings.map(w => `• ${w}`).join('\n'),
        type: 'warning',
        timestamp: new Date(),
      });
    }
    return msgs;
  },
};

function generateAcronym(name: string): string {
  const words = name
    .replace(/['"]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['de', 'du', 'des', 'la', 'le', 'les', 'et', 'en', 'sur'].includes(w.toLowerCase()));
  if (words.length === 0) return name.substring(0, 4).toUpperCase();
  if (words.length === 1) return words[0].substring(0, 4).toUpperCase();
  return words.slice(0, 4).map(w => w[0].toUpperCase()).join('');
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function generateStrongPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let pwd = '';
  for (let i = 0; i < 16; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  if (!/[A-Z]/.test(pwd)) pwd = 'X' + pwd.slice(1);
  if (!/[a-z]/.test(pwd)) pwd = pwd.slice(0, -1) + 'x';
  if (!/[0-9]/.test(pwd)) pwd = pwd.slice(0, -2) + '7' + pwd.slice(-1);
  if (!/[!@#$%&*]/.test(pwd)) pwd = pwd.slice(0, -3) + '#' + pwd.slice(-2);
  return pwd;
}

function getDefaultCycles(schoolType: string): string[] {
  const map: Record<string, string[]> = {
    ECOLE_MATERNELLE: ['Maternelle'],
    ECOLE_PRIMAIRE: ['Primaire'],
    COLLEGE: ['Collège'],
    LYCEE: ['Lycée'],
    UNIVERSITE: ['Licence', 'Master', 'Doctorat'],
    INSTITUT: ['BTS', 'Licence'],
    FORMATION: ['Formation'],
  };
  return map[schoolType] || ['Primaire', 'Collège', 'Lycée'];
}

function getRecommendedModules(schoolType: string): string[] {
  const base = ['Élèves', 'Enseignants', 'Classes', 'Notes', 'Bulletins', 'Présences', 'Paiements', 'Notifications', 'Rapports'];
  const extras: Record<string, string[]> = {
    ECOLE_MATERNELLE: ['Photos', 'Messagerie'],
    ECOLE_PRIMAIRE: ['Parents', 'Transport', 'Messagerie'],
    COLLEGE: ['Parents', 'Transport', 'Emploi du temps', 'Messagerie', 'EduCI AI'],
    LYCEE: ['Parents', 'Transport', 'Emploi du temps', 'Messagerie', 'EduCI AI', 'Orientation'],
    UNIVERSITE: ['Emploi du temps', 'EduCI AI', 'Recherche', 'Bibliothèque'],
    INSTITUT: ['Emploi du temps', 'EduCI AI', 'Stages'],
    FORMATION: ['Emploi du temps', 'Certifications'],
  };
  return [...base, ...(extras[schoolType] || [])];
}

function getPaletteSuggestions(type: string): { primary: string; secondary: string; accent: string; label: string }[] {
  const palettes = [
    { primary: '#1E40AF', secondary: '#059669', accent: '#F59E0B', label: 'Professionnel' },
    { primary: '#7C3AED', secondary: '#EC4899', accent: '#06B6D4', label: 'Créatif' },
    { primary: '#2563EB', secondary: '#10B981', accent: '#F97316', label: 'Éducatif' },
    { primary: '#0F172A', secondary: '#6366F1', accent: '#F43F5E', label: 'Moderne' },
    { primary: '#166534', secondary: '#CA8A04', accent: '#DC2626', label: 'Nature' },
  ];
  return palettes;
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function OnboardingAssistant() {
  const { currentStep, data, updateSchool, updateBranding, updateAcademic, setModules, updateNotifications } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [lastStep, setLastStep] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addAssistantMessage = useCallback((content: string, type: Message['type'] = 'info', actions?: QuickAction[]) => {
    setIsTyping(true);
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content,
        type,
        timestamp: new Date(),
        actions,
      }]);
      setIsTyping(false);
      setHasNewMessage(true);
      setTimeout(() => setHasNewMessage(false), 3000);
    }, delay);
  }, []);

  useEffect(() => {
    if (currentStep !== lastStep && isOpen) {
      setLastStep(currentStep);
      const tips = STEP_TIPS[currentStep];
      if (tips) {
        const newMsgs = tips(data);
        if (newMsgs.length > 0) {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, ...newMsgs]);
            setIsTyping(false);
            setHasNewMessage(true);
            setTimeout(() => setHasNewMessage(false), 3000);
          }, 400);
        }
      }
    }
  }, [currentStep, data, isOpen, lastStep]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleQuickAction = useCallback((action: string, value?: unknown) => {
    switch (action) {
      case 'generate-acronym': {
        const acronym = generateAcronym(data.school.officialName || 'ECOLE');
        updateSchool({ acronym });
        addAssistantMessage(`Acronyme généré : **${acronym}** basé sur "${data.school.officialName}". Vous pouvez le modifier si besoin.`, 'success');
        break;
      }
      case 'suggest-password': {
        const pwd = generateStrongPassword();
        addAssistantMessage(`Voici un mot de passe sécurisé suggéré : \`${pwd}\`\n\nCopiez-le et collez-le dans le champ mot de passe.`, 'suggestion');
        break;
      }
      case 'palette-professional': {
        updateBranding({ primaryColor: '#1E40AF', secondaryColor: '#059669', accentColor: '#F59E0B', buttonColor: '#1E40AF' });
        addAssistantMessage("Palette **Professionnelle** appliquée : Bleu marine, Vert émeraude, Ambre.", 'success');
        break;
      }
      case 'palette-creative': {
        updateBranding({ primaryColor: '#7C3AED', secondaryColor: '#EC4899', accentColor: '#06B6D4', buttonColor: '#7C3AED' });
        addAssistantMessage("Palette **Créative** appliquée : Violet, Rose, Cyan.", 'success');
        break;
      }
      case 'palette-educational': {
        updateBranding({ primaryColor: '#2563EB', secondaryColor: '#10B981', accentColor: '#F97316', buttonColor: '#2563EB' });
        addAssistantMessage("Palette **Éducative** appliquée : Bleu, Vert, Orange.", 'success');
        break;
      }
      case 'suggest-colors': {
        const primary = data.branding.primaryColor || '#4F46E5';
        const lum = getRelativeLuminance(primary);
        const suggestedSecondary = lum > 0.3 ? '#1E293B' : '#F8FAFC';
        updateBranding({ secondaryColor: suggestedSecondary });
        addAssistantMessage(`Couleur secondaire ajustée pour un meilleur contraste : **${suggestedSecondary}**.`, 'success');
        break;
      }
      case 'set-grading-20': {
        updateAcademic({ gradingSystem: '20' });
        addAssistantMessage("Échelle de notation sur **20 points** appliquée.", 'success');
        break;
      }
      case 'apply-cycles': {
        const cycles = value as string[];
        updateAcademic({ cycles });
        addAssistantMessage(`Cycles appliqués : **${cycles.join(', ')}**.`, 'success');
        break;
      }
      case 'add-recommended-modules': {
        const missing = value as string[];
      const all = Array.from(new Set([...data.modules, ...missing]));
      setModules(all);
        addAssistantMessage(`Modules ajoutés : **${missing.join(', ')}**. Total : ${all.length} modules.`, 'success');
        break;
      }
      case 'setup-moneyfusion': {
        updateBranding({ primaryColor: data.branding.primaryColor || '#4F46E5' });
        addAssistantMessage("Pour configurer Money Fusion, vous aurez besoin de :\n• **URL de paiement** (depuis votre tableau de bord Money Fusion)\n  Format : https://pay.moneyfusion.net/{businessname}/{token}/pay/\n\nPassez à l'étape suivante pour la saisir.", 'info');
        break;
      }
      case 'enable-email-push': {
        updateNotifications({ emailEnabled: true, pushEnabled: true, smsEnabled: false, whatsappEnabled: false });
        addAssistantMessage("Notifications **Email** et **Push** activées avec succès !", 'success');
        break;
      }
      default:
        break;
    }
  }, [data, updateSchool, updateBranding, updateAcademic, setModules, updateNotifications, addAssistantMessage]);

  const handleSendMessage = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      type: 'info',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const lower = text.toLowerCase();
    if (lower.includes('acronyme') || lower.includes('acronym')) {
      if (data.school.officialName) {
        const acronym = generateAcronym(data.school.officialName);
        updateSchool({ acronym });
        addAssistantMessage(`Acronyme généré : **${acronym}** pour "${data.school.officialName}".`, 'success');
      } else {
        addAssistantMessage("Veuillez d'abord saisir le nom de l'établissement pour que je puisse générer un acronyme.", 'question');
      }
    } else if (lower.includes('couleur') || lower.includes('palette') || lower.includes('color')) {
      const palettes = getPaletteSuggestions(data.school.type);
      const labels = palettes.map(p => `• **${p.label}** : ${p.primary} / ${p.secondary}`).join('\n');
      addAssistantMessage(`Voici les palettes disponibles :\n\n${labels}\n\nChoisissez-en une en cliquant sur les boutons ci-dessous.`, 'suggestion', [
        { label: 'Professionnel', action: 'palette-professional', icon: <Palette size={12} /> },
        { label: 'Créatif', action: 'palette-creative', icon: <Palette size={12} /> },
        { label: 'Éducatif', action: 'palette-educational', icon: <Palette size={12} /> },
      ]);
    } else if (lower.includes('module') || lower.includes('recommand')) {
      const recommended = getRecommendedModules(data.school.type);
      const missing = recommended.filter(m => !data.modules.includes(m));
      if (missing.length > 0) {
        addAssistantMessage(`Je recommande ces modules pour un **${data.school.type}** :\n\n${missing.map(m => `• ${m}`).join('\n')}`, 'suggestion', [
          { label: 'Ajouter les recommandés', action: 'add-recommended-modules', value: missing, icon: <Sparkles size={12} /> },
        ]);
      } else {
        addAssistantMessage("Vous avez déjà tous les modules recommandés pour votre type d'établissement !", 'success');
      }
    } else if (lower.includes('paiement') || lower.includes('money fusion') || lower.includes('mobile money')) {
      addAssistantMessage("Pour les paiements, je recommande **Money Fusion**. C'est la solution la plus fiable en Côte d'Ivoire.\n\n• Supporte Mobile Money (Orange, MTN, Wave, Moov) et cartes bancaires\n• Intégration simple via URL de paiement\n• Réconciliation automatique", 'info', [
        { label: 'Configurer Money Fusion', action: 'setup-moneyfusion', icon: <CreditCard size={12} /> },
      ]);
    } else if (lower.includes('mot de passe') || lower.includes('password') || lower.includes('sécurité')) {
      const pwd = generateStrongPassword();
      addAssistantMessage(`Voici un mot de passe sécurisé :\n\n\`${pwd}\`\n\nIl contient des majuscules, minuscules, chiffres et caractères spéciaux.`, 'suggestion');
    } else if (lower.includes('notification') || lower.includes('alerte') || lower.includes('email')) {
      addAssistantMessage("Les notifications sont essentielles. Je recommande :\n• **Email** : Pour les rapports et confirmations\n• **Push** : Pour les alertes en temps réel\n• **SMS** : Optionnel, pour les urgences\n\nVoulez-vous que j'active les recommandés ?", 'info', [
        { label: 'Activer Email + Push', action: 'enable-email-push', icon: <Bell size={12} /> },
      ]);
    } else if (lower.includes('aide') || lower.includes('help') || lower.includes('comment')) {
      addAssistantMessage("Je peux vous aider avec :\n• 🎨 **Couleurs** - Suggestions de palettes\n• 📝 **Modules** - Recommandations par type\n• 💳 **Paiements** - Configuration Money Fusion\n• 🔔 **Notifications** - Paramétrage\n• 🔒 **Sécurité** - Mots de passe\n• 📊 **Académique** - Échelles et cycles\n\nPosez-moi votre question !", 'info');
    } else if (lower.includes('merci') || lower.includes('thank')) {
      addAssistantMessage("Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Je suis là pour vous accompagner. 😊", 'success');
    } else {
      addAssistantMessage("Je ne suis pas sûr de comprendre votre question. Vous pouvez me demander de l'aide avec :\n• Les couleurs et palettes\n• Les modules recommandés\n• La configuration des paiements\n• Les notifications\n• Les mots de passe sécurisés\n\nOu utilisez les boutons d'action rapide !", 'question');
    }
  }, [inputValue, data, updateSchool, addAssistantMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const escapeHtml = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
  const formatMessage = (content: string) => {
    const escaped = escapeHtml(content);
    return escaped
      .replace(/\*\*([^<]*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/`([^<]*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono text-indigo-600">$1</code>')
      .replace(/\n/g, '<br />');
  };

  const typeIcon = (type: Message['type']) => {
    switch (type) {
      case 'suggestion': return <Lightbulb size={14} className="text-amber-500" />;
      case 'warning': return <AlertTriangle size={14} className="text-orange-500" />;
      case 'success': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'question': return <MessageCircle size={14} className="text-blue-500" />;
      default: return <Sparkles size={14} className="text-indigo-500" />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">EduCI AI</h3>
                  <p className="text-[10px] text-white/70">Assistant intelligent</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-200/50">
                    <Bot size={24} className="text-white" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">EduCI AI</p>
                  <p className="text-xs text-slate-500 px-4">Je suis votre assistant intelligent. Posez-moi des questions ou utilisez les actions rapides.</p>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1">
                        {typeIcon(msg.type)}
                        <span className="text-[10px] font-medium text-slate-400">EduCI AI</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-br-md'
                          : msg.type === 'warning'
                          ? 'bg-orange-50 text-slate-800 border border-orange-200 rounded-bl-md'
                          : msg.type === 'success'
                          ? 'bg-emerald-50 text-slate-800 border border-emerald-200 rounded-bl-md'
                          : msg.type === 'suggestion'
                          ? 'bg-amber-50 text-slate-800 border border-amber-200 rounded-bl-md'
                          : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-md'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(action.action, action.value)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#4F46E5]/10 hover:bg-[#4F46E5]/20 text-[#4F46E5] text-[11px] font-semibold rounded-lg transition-all duration-200 active:scale-95"
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center">
                    <Bot size={12} className="text-[#4F46E5]" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">EduCI AI est en train d&apos;écrire</span>
                      <div className="flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 border-t border-slate-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez une question..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-800/30'
            : 'bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] hover:shadow-2xl hover:shadow-indigo-300/40'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}

        {!isOpen && hasNewMessage && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-[8px] font-bold text-white">!</span>
          </motion.span>
        )}

        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] animate-ping opacity-20" />
          </>
        )}
      </motion.button>
    </>
  );
}
