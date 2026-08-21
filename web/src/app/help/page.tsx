'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  GraduationCap, Search, ChevronDown, ChevronUp, HelpCircle,
  User, CreditCard, Bot, Settings, Zap, Mail, Phone, MessageCircle, Sparkles,
} from 'lucide-react';
import { supportConfig, getSupportWhatsappLink } from '@/lib/support';


const categoryIcons = [Zap, User, CreditCard, Bot, Settings];

export default function HelpPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCat, setExpandedCat] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const content = {
    fr: {
      badge: 'Centre d\'aide',
      title: 'Comment pouvons-nous vous aider ?',
      searchPlaceholder: 'Rechercher dans la FAQ...',
      categories: [
        {
          title: 'Premiers pas',
          icon: 'rocket',
          faqs: [
            { q: 'Comment créer un compte EduCI ?', a: "Rendez-vous sur educi.live/register, choisissez votre rôle (école, enseignant, parent), remplissez le formulaire et validez votre email. L'inscription prend moins de 2 minutes." },
            { q: 'Comment configurer mon école ?', a: "Après inscription en tant qu'administrateur, suivez l'assistant de configuration qui vous guidera pour ajouter vos classes, enseignants et élèves." },
            { q: 'Quels navigateurs sont supportés ?', a: "EduCI fonctionne sur tous les navigateurs modernes : Chrome, Firefox, Safari et Edge. Nous recommandons Chrome pour la meilleure expérience." },
            { q: 'Y a-t-il une application mobile ?', a: "Oui ! Notre application est disponible sur iOS (App Store) et Android (Google Play). Recherchez 'EduCI' dans votre store." },
          ],
        },
        {
          title: 'Compte',
          icon: 'user',
          faqs: [
            { q: 'Comment réinitialiser mon mot de passe ?', a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion, entrez votre email et suivez les instructions envoyées dans votre boîte mail." },
            { q: 'Comment changer mon email ?', a: "Allez dans Paramètres > Profil, modifiez votre email et validez le changement via le lien de confirmation envoyé à votre nouvelle adresse." },
            { q: 'Comment supprimer mon compte ?', a: "Contactez notre support via le formulaire de contact. La suppression est irréversible et sera traitée sous 48h." },
          ],
        },
        {
          title: 'Paiements',
          icon: 'credit-card',
          faqs: [
            { q: 'Quels moyens de paiement acceptez-vous ?', a: "Nous acceptons Mobile Money (Orange, MTN, Moov), les virements bancaires et les cartes Visa/Mastercard." },
            { q: 'Comment obtenir une facture ?', a: "Les factures sont automatiquement générées dans Paramètres > Paiements > Historique. Vous pouvez les télécharger en PDF." },
            { q: 'Puis-je obtenir un remboursement ?', a: "Les remboursements sont possibles dans les 30 jours suivant l'abonnement. Contactez le support pour initier la procédure." },
            { q: 'Y a-t-il un essai gratuit ?', a: "Oui, nous offrons 30 jours d'essai gratuit avec toutes les fonctionnalités. Aucune carte bancaire requise." },
          ],
        },
        {
          title: 'Assistant IA',
          icon: 'bot',
          faqs: [
            { q: 'Comment fonctionne l\'assistant IA ?', a: "L'assistant IA analyse les données scolaires pour fournir des recommandations personnalisées, détecter les élèves en difficulté et suggérer des plans d'étude adaptés." },
            { q: 'L\'assistant IA est-il disponible en français ?', a: "Oui, l'assistant IA supporte le français et l'anglais. Il peut également aider avec des exercices dans les deux langues." },
            { q: 'Les données sont-elles sécurisées ?', a: "Toutes les données sont chiffrées (AES-256) et stockées dans des serveurs conformes RGPD. Nous ne partageons jamais vos données avec des tiers." },
          ],
        },
        {
          title: 'Technique',
          icon: 'wrench',
          faqs: [
            { q: 'EduCI fonctionne-t-il hors ligne ?', a: "Certaines fonctionnalités comme le relevé de présence fonctionnent hors ligne. Les données se synchronisent automatiquement dès que la connexion est rétablie." },
            { q: 'Comment intégrer EduCI avec d\'autres outils ?', a: "Nous proposons une API REST documentée. Contactez notre équipe technique pour les intégrations personnalisées." },
            { q: 'Quelle est la disponibilité du service ?', a: "Nous maintenons un uptime de 99,9%. Consultez notre page de statut en temps réel à educi.live/status." },
            { q: 'Comment signaler un bug ?', a: `Utilisez le bouton 'Signaler un problème' dans l'application ou envoyez un email à ${supportConfig.emails.support} avec les détails.` },
          ],
        },
      ],
      contactTitle: 'Besoin d\'aide supplémentaire ?',
      contactDesc: 'Notre équipe de support est disponible du lundi au vendredi de 8h à 18h (GMT).',
      emailUs: 'Envoyez-nous un email',
      callUs: 'Appelez-nous',
      chatUs: 'Chat en direct',
    },
    en: {
      badge: 'Help Center',
      title: 'How can we help you?',
      searchPlaceholder: 'Search the FAQ...',
      categories: [
        {
          title: 'Getting Started',
          icon: 'rocket',
          faqs: [
            { q: 'How do I create an EduCI account?', a: 'Go to educi.live/register, choose your role (school, teacher, parent), fill out the form and verify your email. Registration takes less than 2 minutes.' },
            { q: 'How do I set up my school?', a: 'After registering as an administrator, follow the setup wizard that will guide you to add your classes, teachers and students.' },
            { q: 'Which browsers are supported?', a: 'EduCI works on all modern browsers: Chrome, Firefox, Safari and Edge. We recommend Chrome for the best experience.' },
            { q: 'Is there a mobile app?', a: 'Yes! Our app is available on iOS (App Store) and Android (Google Play). Search for "EduCI" in your store.' },
          ],
        },
        {
          title: 'Account',
          icon: 'user',
          faqs: [
            { q: 'How do I reset my password?', a: 'Click "Forgot password" on the login page, enter your email and follow the instructions sent to your inbox.' },
            { q: 'How do I change my email?', a: 'Go to Settings > Profile, update your email and confirm the change via the verification link sent to your new address.' },
            { q: 'How do I delete my account?', a: 'Contact our support via the contact form. Deletion is irreversible and will be processed within 48 hours.' },
          ],
        },
        {
          title: 'Payments',
          icon: 'credit-card',
          faqs: [
            { q: 'What payment methods do you accept?', a: 'We accept Mobile Money (Orange, MTN, Moov), bank transfers and Visa/Mastercard cards.' },
            { q: 'How do I get an invoice?', a: 'Invoices are automatically generated in Settings > Payments > History. You can download them as PDF.' },
            { q: 'Can I get a refund?', a: 'Refunds are possible within 30 days of subscription. Contact support to initiate the process.' },
            { q: 'Is there a free trial?', a: 'Yes, we offer a 30-day free trial with all features. No credit card required.' },
          ],
        },
        {
          title: 'AI Assistant',
          icon: 'bot',
          faqs: [
            { q: 'How does the AI assistant work?', a: 'The AI assistant analyzes school data to provide personalized recommendations, detect struggling students and suggest adapted study plans.' },
            { q: 'Is the AI assistant available in English?', a: 'Yes, the AI assistant supports both French and English. It can also help with exercises in both languages.' },
            { q: 'Is my data secure?', a: 'All data is encrypted (AES-256) and stored on GDPR-compliant servers. We never share your data with third parties.' },
          ],
        },
        {
          title: 'Technical',
          icon: 'wrench',
          faqs: [
            { q: 'Does EduCI work offline?', a: 'Some features like attendance work offline. Data syncs automatically once the connection is restored.' },
            { q: 'How do I integrate EduCI with other tools?', a: 'We offer a documented REST API. Contact our technical team for custom integrations.' },
            { q: 'What is the service availability?', a: 'We maintain 99.9% uptime. Check our real-time status page at educi.live/status.' },
            { q: 'How do I report a bug?', a: `Use the "Report an issue" button in the app or email ${supportConfig.emails.support} with details.` },
          ],
        },
      ],
      contactTitle: 'Need additional help?',
      contactDesc: 'Our support team is available Monday to Friday from 8am to 6pm (GMT).',
      emailUs: 'Email us',
      callUs: 'Call us',
      chatUs: 'Live chat',
    },
  };

  const t = content[lang];
  const catIcons = [Zap, User, CreditCard, Bot, Settings];

  const filteredCategories = searchQuery
    ? t.categories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(faq =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.faqs.length > 0)
    : t.categories;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold text-[#111827]">EduCI</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'À propos' : 'About'}</a>
            <a href="/help" className="text-sm font-semibold text-[#4F46E5]">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/contact" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">{lang === 'fr' ? 'Contact' : 'Contact'}</a>

            <a href="/login" className="px-5 py-2.5 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              {lang === 'fr' ? 'Connexion' : 'Login'}
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#4F46E5] via-indigo-700 to-[#60A5FA] py-12 relative overflow-hidden">
        <div className="absolute top-16 right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <HelpCircle size={14} />
            {t.badge}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">{t.title}</h1>
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-4">
          {filteredCategories.map((cat, ci) => {
            const Icon = catIcons[t.categories.findIndex(c => c.title === cat.title)] || HelpCircle;
            return (
              <div key={ci} className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setExpandedCat(expandedCat === ci ? null : ci)}
                  className="w-full p-6 flex items-center gap-4 text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#111827]">{cat.title}</h3>
                    <p className="text-sm text-[#6B7280]">{cat.faqs.length} {lang === 'fr' ? 'articles' : 'articles'}</p>
                  </div>
                  {expandedCat === ci ? <ChevronUp size={20} className="text-[#6B7280]" /> : <ChevronDown size={20} className="text-[#6B7280]" />}
                </button>
                {expandedCat === ci && (
                  <div className="border-t border-slate-100">
                    {cat.faqs.map((faq, fi) => (
                      <div key={fi} className="border-b border-slate-50 last:border-b-0">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === `${ci}-${fi}` ? null : `${ci}-${fi}`)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left"
                        >
                          <span className="text-sm font-semibold text-[#111827] pr-4">{faq.q}</span>
                          {expandedFaq === `${ci}-${fi}` ? <ChevronUp size={16} className="text-[#6B7280] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#6B7280] flex-shrink-0" />}
                        </button>
                        {expandedFaq === `${ci}-${fi}` && (
                          <div className="px-6 pb-4">
                            <p className="text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Support */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-2">{t.contactTitle}</h2>
          <p className="text-white/80 mb-8">{t.contactDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href={`mailto:${supportConfig.emails.support}`} className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl py-4 text-sm font-semibold hover:bg-white/30 transition-colors">
              <Mail size={18} />
              {t.emailUs}
            </a>
            <a href="tel:+22500000000" className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl py-4 text-sm font-semibold hover:bg-white/30 transition-colors">
              <Phone size={18} />
              {t.callUs}
            </a>
            <a href="/contact" className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl py-4 text-sm font-semibold hover:bg-white/30 transition-colors">
              <MessageCircle size={18} />
              {t.chatUs}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={24} />
            <span className="font-bold">EduCI</span>
          </div>
          <p className="text-sm text-slate-400">© 2025 EduCI. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <a href="/help" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Aide' : 'Help'}</a>
            <a href="/status" className="text-sm text-slate-400 hover:text-white">{lang === 'fr' ? 'Statut' : 'Status'}</a>
            <a href="/contact" className="text-sm text-slate-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
