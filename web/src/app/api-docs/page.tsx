'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Key,
  Globe,
  BookOpen,
  School,
  Users,
  GraduationCap,
  BarChart3,
  Clock,
  CreditCard,
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

const translations = {
  en: {
    hero: {
      badge: 'Developer Docs',
      title: 'EduCI API Documentation',
      subtitle: 'Integrate EduCI with your existing systems using our RESTful API.',
    },
    quickStart: {
      title: 'Quick Start',
      auth: {
        title: 'Authentication',
        description: 'All API requests require a Bearer token in the Authorization header.',
      },
      baseUrl: {
        title: 'Base URL',
        description: 'Use this base URL for all API requests.',
      },
      example: 'Example Request',
    },
    categories: [
      {
        name: 'Authentication',
        icon: 'key',
        endpoints: [
          { method: 'POST', path: '/api/v1/auth/login', description: 'Authenticate user and get access token' },
          { method: 'POST', path: '/api/v1/auth/register', description: 'Register a new school administrator' },
          { method: 'POST', path: '/api/v1/auth/refresh', description: 'Refresh expired access token' },
          { method: 'POST', path: '/api/v1/auth/logout', description: 'Invalidate current access token' },
        ],
      },
      {
        name: 'Schools',
        icon: 'school',
        endpoints: [
          { method: 'GET', path: '/api/v1/schools', description: 'List all schools (admin only)' },
          { method: 'GET', path: '/api/v1/schools/:id', description: 'Get school details by ID' },
          { method: 'POST', path: '/api/v1/schools', description: 'Create a new school' },
          { method: 'PATCH', path: '/api/v1/schools/:id', description: 'Update school information' },
          { method: 'DELETE', path: '/api/v1/schools/:id', description: 'Delete a school' },
        ],
      },
      {
        name: 'Students',
        icon: 'users',
        endpoints: [
          { method: 'GET', path: '/api/v1/students', description: 'List all students with pagination' },
          { method: 'GET', path: '/api/v1/students/:id', description: 'Get student details by ID' },
          { method: 'POST', path: '/api/v1/students', description: 'Enroll a new student' },
          { method: 'PATCH', path: '/api/v1/students/:id', description: 'Update student information' },
          { method: 'DELETE', path: '/api/v1/students/:id', description: 'Remove a student' },
          { method: 'GET', path: '/api/v1/students/:id/grades', description: 'Get student grade history' },
        ],
      },
      {
        name: 'Teachers',
        icon: 'graduation',
        endpoints: [
          { method: 'GET', path: '/api/v1/teachers', description: 'List all teachers' },
          { method: 'GET', path: '/api/v1/teachers/:id', description: 'Get teacher details' },
          { method: 'POST', path: '/api/v1/teachers', description: 'Add a new teacher' },
          { method: 'PATCH', path: '/api/v1/teachers/:id', description: 'Update teacher information' },
          { method: 'GET', path: '/api/v1/teachers/:id/schedule', description: 'Get teacher schedule' },
        ],
      },
      {
        name: 'Grades',
        icon: 'chart',
        endpoints: [
          { method: 'GET', path: '/api/v1/grades', description: 'List grades with filters' },
          { method: 'POST', path: '/api/v1/grades', description: 'Submit a new grade' },
          { method: 'PATCH', path: '/api/v1/grades/:id', description: 'Update a grade' },
          { method: 'GET', path: '/api/v1/grades/report/:studentId', description: 'Generate student report card' },
          { method: 'GET', path: '/api/v1/grades/class/:classId', description: 'Get class grade summary' },
        ],
      },
      {
        name: 'Attendance',
        icon: 'clock',
        endpoints: [
          { method: 'GET', path: '/api/v1/attendance', description: 'List attendance records' },
          { method: 'POST', path: '/api/v1/attendance', description: 'Record attendance for a class' },
          { method: 'GET', path: '/api/v1/attendance/student/:id', description: 'Get student attendance history' },
          { method: 'GET', path: '/api/v1/attendance/stats/:classId', description: 'Get class attendance statistics' },
        ],
      },
      {
        name: 'Payments',
        icon: 'creditcard',
        endpoints: [
          { method: 'GET', path: '/api/v1/payments', description: 'List all payments' },
          { method: 'POST', path: '/api/v1/payments', description: 'Initiate a payment' },
          { method: 'GET', path: '/api/v1/payments/:id', description: 'Get payment status' },
          { method: 'POST', path: '/api/v1/payments/webhook', description: 'Payment provider webhook' },
          { method: 'GET', path: '/api/v1/payments/student/:id', description: 'Get student payment history' },
        ],
      },
      {
        name: 'Messaging',
        icon: 'message',
        endpoints: [
          { method: 'GET', path: '/api/v1/messages', description: 'List messages for current user' },
          { method: 'POST', path: '/api/v1/messages', description: 'Send a message to a parent/teacher' },
          { method: 'GET', path: '/api/v1/messages/:id', description: 'Get message thread' },
          { method: 'POST', path: '/api/v1/messages/broadcast', description: 'Send broadcast to all parents' },
        ],
      },
    ],
    footer: {
      copyright: '© 2026 EduCI. All rights reserved.',
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
    },
  },
  fr: {
    hero: {
      badge: 'Docs Développeur',
      title: 'Documentation API EduCI',
      subtitle: 'Intégrez EduCI à vos systèmes existants avec notre API RESTful.',
    },
    quickStart: {
      title: 'Démarrage Rapide',
      auth: {
        title: 'Authentification',
        description: 'Toutes les requêtes API nécessitent un token Bearer dans l\'en-tête Authorization.',
      },
      baseUrl: {
        title: 'URL de Base',
        description: 'Utilisez cette URL de base pour toutes les requêtes API.',
      },
      example: 'Exemple de Requête',
    },
    categories: [
      {
        name: 'Authentification',
        icon: 'key',
        endpoints: [
          { method: 'POST', path: '/api/v1/auth/login', description: 'Authentifier un utilisateur et obtenir un token' },
          { method: 'POST', path: '/api/v1/auth/register', description: 'Inscrire un nouvel administrateur' },
          { method: 'POST', path: '/api/v1/auth/refresh', description: 'Rafraîchir un token expiré' },
          { method: 'POST', path: '/api/v1/auth/logout', description: 'Invalider le token actuel' },
        ],
      },
      {
        name: 'Écoles',
        icon: 'school',
        endpoints: [
          { method: 'GET', path: '/api/v1/schools', description: 'Lister toutes les écoles (admin)' },
          { method: 'GET', path: '/api/v1/schools/:id', description: 'Obtenir les détails d\'une école' },
          { method: 'POST', path: '/api/v1/schools', description: 'Créer une nouvelle école' },
          { method: 'PATCH', path: '/api/v1/schools/:id', description: 'Mettre à jour les infos de l\'école' },
          { method: 'DELETE', path: '/api/v1/schools/:id', description: 'Supprimer une école' },
        ],
      },
      {
        name: 'Élèves',
        icon: 'users',
        endpoints: [
          { method: 'GET', path: '/api/v1/students', description: 'Lister tous les élèves avec pagination' },
          { method: 'GET', path: '/api/v1/students/:id', description: 'Obtenir les détails d\'un élève' },
          { method: 'POST', path: '/api/v1/students', description: 'Inscrire un nouvel élève' },
          { method: 'PATCH', path: '/api/v1/students/:id', description: 'Mettre à jour les infos de l\'élève' },
          { method: 'DELETE', path: '/api/v1/students/:id', description: 'Supprimer un élève' },
          { method: 'GET', path: '/api/v1/students/:id/grades', description: 'Obtenir l\'historique des notes' },
        ],
      },
      {
        name: 'Enseignants',
        icon: 'graduation',
        endpoints: [
          { method: 'GET', path: '/api/v1/teachers', description: 'Lister tous les enseignants' },
          { method: 'GET', path: '/api/v1/teachers/:id', description: 'Obtenir les détails d\'un enseignant' },
          { method: 'POST', path: '/api/v1/teachers', description: 'Ajouter un nouvel enseignant' },
          { method: 'PATCH', path: '/api/v1/teachers/:id', description: 'Mettre à jour les infos' },
          { method: 'GET', path: '/api/v1/teachers/:id/schedule', description: 'Obtenir le planning' },
        ],
      },
      {
        name: 'Notes',
        icon: 'chart',
        endpoints: [
          { method: 'GET', path: '/api/v1/grades', description: 'Lister les notes avec filtres' },
          { method: 'POST', path: '/api/v1/grades', description: 'Soumettre une nouvelle note' },
          { method: 'PATCH', path: '/api/v1/grades/:id', description: 'Mettre à jour une note' },
          { method: 'GET', path: '/api/v1/grades/report/:studentId', description: 'Générer un bulletin' },
          { method: 'GET', path: '/api/v1/grades/class/:classId', description: 'Résumé des notes de la classe' },
        ],
      },
      {
        name: 'Présences',
        icon: 'clock',
        endpoints: [
          { method: 'GET', path: '/api/v1/attendance', description: 'Lister les présences' },
          { method: 'POST', path: '/api/v1/attendance', description: 'Enregistrer les présences d\'une classe' },
          { method: 'GET', path: '/api/v1/attendance/student/:id', description: 'Historique de présence d\'un élève' },
          { method: 'GET', path: '/api/v1/attendance/stats/:classId', description: 'Statistiques de présence' },
        ],
      },
      {
        name: 'Paiements',
        icon: 'creditcard',
        endpoints: [
          { method: 'GET', path: '/api/v1/payments', description: 'Lister tous les paiements' },
          { method: 'POST', path: '/api/v1/payments', description: 'Initier un paiement' },
          { method: 'GET', path: '/api/v1/payments/:id', description: 'Obtenir le statut d\'un paiement' },
          { method: 'POST', path: '/api/v1/payments/webhook', description: 'Webhook du fournisseur de paiement' },
          { method: 'GET', path: '/api/v1/payments/student/:id', description: 'Historique des paiements d\'un élève' },
        ],
      },
      {
        name: 'Messagerie',
        icon: 'message',
        endpoints: [
          { method: 'GET', path: '/api/v1/messages', description: 'Lister les messages de l\'utilisateur' },
          { method: 'POST', path: '/api/v1/messages', description: 'Envoyer un message' },
          { method: 'GET', path: '/api/v1/messages/:id', description: 'Obtenir un fil de discussion' },
          { method: 'POST', path: '/api/v1/messages/broadcast', description: 'Envoyer un message à tous les parents' },
        ],
      },
    ],
    footer: {
      copyright: '© 2026 EduCI. Tous droits réservés.',
      home: 'Accueil',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      contact: 'Contact',
    },
  },
};

const categoryIcons: Record<string, typeof Key> = {
  key: Key,
  school: School,
  users: Users,
  graduation: GraduationCap,
  chart: BarChart3,
  clock: Clock,
  creditcard: CreditCard,
  message: MessageSquare,
};

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  POST: { bg: 'bg-blue-100', text: 'text-blue-700' },
  PATCH: { bg: 'bg-amber-100', text: 'text-amber-700' },
  DELETE: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function ApiDocsPage() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const t = translations[lang] || translations.en;

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeExample = `curl -X GET "https://api.educi.ci/v1/students" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json"`;

  const responseExample = `{
  "data": [
    {
      "id": "stu_abc123",
      "first_name": "Jean",
      "last_name": "Kouassi",
      "class": "6ème A",
      "enrollment_date": "2025-09-01",
      "status": "active"
    }
  ],
  "meta": {
    "total": 245,
    "page": 1,
    "per_page": 20
  }
}`;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #60A5FA 100%)' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f8f9fa]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </header>

      {/* Quick Start */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-[#111827] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t.quickStart.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Auth */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <h3 className="font-semibold text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.quickStart.auth.title}
              </h3>
            </div>
            <p className="text-[#6B7280] text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.quickStart.auth.description}
            </p>
            <div className="bg-gray-900 rounded-xl p-4 relative group">
              <code className="text-sm text-gray-100 font-mono">
                Authorization: Bearer &lt;your_api_token&gt;
              </code>
              <button
                onClick={() => copyToClipboard('Authorization: Bearer <your_api_token>', -1)}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedIndex === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Base URL */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <h3 className="font-semibold text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.quickStart.baseUrl.title}
              </h3>
            </div>
            <p className="text-[#6B7280] text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.quickStart.baseUrl.description}
            </p>
            <div className="bg-gray-900 rounded-xl p-4 relative group">
              <code className="text-sm text-gray-100 font-mono">
                https://api.educi.ci/v1
              </code>
              <button
                onClick={() => copyToClipboard('https://api.educi.ci/v1', -2)}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copiedIndex === -2 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm font-medium text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.quickStart.example}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3 block" style={{ fontFamily: 'Inter, sans-serif' }}>
                Request
              </span>
              <div className="bg-gray-900 rounded-xl p-4 relative group">
                <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{codeExample}</pre>
                <button
                  onClick={() => copyToClipboard(codeExample, 0)}
                  className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedIndex === 0 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3 block" style={{ fontFamily: 'Inter, sans-serif' }}>
                Response
              </span>
              <div className="bg-gray-900 rounded-xl p-4 relative group">
                <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">{responseExample}</pre>
                <button
                  onClick={() => copyToClipboard(responseExample, 1)}
                  className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedIndex === 1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-8">
          {t.categories.map((category, catIndex) => {
            const Icon = categoryIcons[category.icon] || BookOpen;
            return (
              <div key={catIndex} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <h3 className="font-semibold text-[#111827] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {category.name}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.endpoints.map((endpoint, epIndex) => {
                    const colors = methodColors[endpoint.method];
                    return (
                      <div key={epIndex} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold min-w-[60px] text-center ${colors.bg} ${colors.text}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-[#111827] font-mono bg-gray-100 px-3 py-1 rounded-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {endpoint.path}
                        </code>
                        <span className="text-sm text-[#6B7280] hidden sm:block" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {endpoint.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.footer.copyright}
            </p>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.home}
              </Link>
              <Link href="/features" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.features}
              </Link>
              <Link href="/pricing" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.pricing}
              </Link>
              <Link href="/demo" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.contact}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
