'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  GraduationCap, ArrowRight, Play, Check, Menu, X,
  Sparkles, Users, CreditCard, BookOpen, MessageSquare, Bus,
  Clock, TrendingUp, Shield, Bot, ChevronRight, ChevronDown,
  Facebook, Twitter, Instagram, Linkedin,
  Calendar, FileText, ShieldCheck, HeadphonesIcon,
  BarChart3, Zap, UsersRound, Bell, QrCode, MapPinned,
  Smartphone, Tablet, Monitor, Download,
  Lock, Database, Eye, Fingerprint,
  Star, Receipt, Wallet, RefreshCw,
  Globe, Layers, Cpu, Workflow, Target, Gauge,
  CircleDot, ScanLine, Map, Award, Rocket,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { sbDashboard, sbSchools } from '@/lib/api';
import EduCILogo from '@/components/brand/EduCILogo';

// ─── Intersection Observer Hook ──────────────────────────

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Animated Components ─────────────────────────────────

function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const { ref, inView } = useInView();
  const base = { up: 'translate-y-6', left: '-translate-x-6', right: 'translate-x-6', scale: 'scale-[0.97]' };
  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : `opacity-0 ${base[direction]} blur-[1px]`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (!inView || end === 0) return;
    let current = 0;
    const step = Math.max(1, Math.floor(end / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(current);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref as any}>{count.toLocaleString('fr-FR')}{suffix}</span>;
}

// ─── Section Wrapper ─────────────────────────────────────

function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-14 sm:py-18 lg:py-22 ${className}`}>
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
}

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
      <span className="inline-flex items-center gap-2 bg-primary/[0.06] text-primary px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-5 border border-primary/10 shadow-sm shadow-primary/5">
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        {badge}
      </span>
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
    </Reveal>
  );
}

// ─── Hero Slider ────────────────────────────────────────

const heroSlides = [
  {
    badge: 'Essai gratuit 30 jours — sans carte bancaire',
    title: <>La plateforme scolaire intelligente qui connecte{' '}<span className="bg-gradient-to-r from-primary via-secondary to-primary-300 bg-clip-text text-transparent">établissements, enseignants, parents et élèves</span>{' '}en temps réel.</>,
    subtitle: 'Centralisez la gestion des présences, pointages, notes, bulletins, paiements, transports, emplois du temps, communication et intelligence artificielle sur une seule plateforme moderne et sécurisée.',
    image: '/hero-student.png',
    imageAlt: 'Élève souriante — EduCI',
    accent: 'from-primary/10 via-purple-200/15 to-emerald-100/10',
  },
  {
    badge: 'Tableau de bord intelligent',
    title: <>Pilotez votre établissement en{' '}<span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">temps réel</span> — statistiques, absences, performances, paiements.</>,
    subtitle: 'Tout est visible d\'un coup d\'œil depuis votre dashboard personnalisé. Prenez des décisions éclairées grâce à des rapports intelligents et des alertes en temps réel.',
    image: '/hero-dashboard.png',
    imageAlt: 'Équipe éducative professionnelle — EduCI',
    accent: 'from-emerald-500/10 via-teal-200/15 to-blue-100/10',
  },
  {
    badge: 'Paiements Money Fusion',
    title: <>Encaissez les frais scolaires via{' '}<span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Money Fusion</span> — Mobile Money et Carte bancaire.</>,
    subtitle: 'Vos parents paient en un clic depuis leur téléphone. Réconciliation automatique, reçus PDF instantanés, relances intelligentes pour les retards.',
    image: '/hero-family.png',
    imageAlt: 'Famille connectée — Parents et élève EduCI',
    accent: 'from-amber-500/10 via-orange-200/15 to-yellow-100/10',
  },
  {
    badge: 'Intelligence Artificielle',
    title: <>Un assistant IA au service de{' '}<span className="bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent">votre pédagogie</span> — propulsé par DeepSeek.</>,
    subtitle: 'Génération de bulletins, détection d\'élèves en difficulté, suggestions personnalisées, quiz interactifs — l\'IA qui comprend votre école et vos élèves.',
    image: '/hero-students.png',
    imageAlt: 'Élèves avec leurs livres — EduCI AI',
    accent: 'from-violet-500/10 via-fuchsia-200/15 to-pink-100/10',
  },
];

const heroPremiumCardsBySlide = [
  [
    { icon: Check, label: 'Présence enregistrée', sub: 'Élève identifié', color: 'emerald', position: '-top-4 -left-8 lg:-left-16', delay: '0ms' },
    { icon: Bell, label: 'Notification envoyée', sub: 'Parent informé', color: 'blue', position: 'top-[30%] -right-6 lg:-right-14', delay: '150ms' },
    { icon: Sparkles, label: 'Suggestion IA', sub: 'Soutien recommandé', color: 'violet', position: 'bottom-[30%] -left-10 lg:-left-20', delay: '300ms' },
    { icon: FileText, label: 'Bulletin publié', sub: 'Moyenne : 16.2/20', color: 'violet', position: 'bottom-4 -right-8 lg:-right-16', delay: '450ms' },
  ],
  [
    { icon: TrendingUp, label: 'Taux de réussite +12%', sub: 'Ce trimestre', color: 'emerald', position: '-top-4 -left-8 lg:-left-16', delay: '0ms' },
    { icon: UsersRound, label: '1 240 élèves actifs', sub: 'En ligne maintenant', color: 'blue', position: 'top-[30%] -right-6 lg:-right-14', delay: '150ms' },
    { icon: BarChart3, label: 'Statistiques', sub: 'Tableau de bord', color: 'indigo', position: 'bottom-[30%] -left-10 lg:-left-20', delay: '300ms' },
    { icon: Zap, label: 'Alertes temps réel', sub: 'Automatisées', color: 'amber', position: 'bottom-4 -right-8 lg:-right-16', delay: '450ms' },
  ],
  [
    { icon: Wallet, label: 'Paiement reçu', sub: '125 000 FCFA', color: 'amber', position: '-top-4 -left-8 lg:-left-16', delay: '0ms' },
    { icon: RefreshCw, label: 'Réconciliation auto', sub: 'Instantanée', color: 'emerald', position: 'top-[30%] -right-6 lg:-right-14', delay: '150ms' },
    { icon: Receipt, label: 'Reçu PDF envoyé', sub: 'Parent notifié', color: 'blue', position: 'bottom-[30%] -left-10 lg:-left-20', delay: '300ms' },
    { icon: Bell, label: 'Relance auto', sub: 'Retard détecté', color: 'violet', position: 'bottom-4 -right-8 lg:-right-16', delay: '450ms' },
  ],
  [
    { icon: Bot, label: 'Bulletin généré', sub: 'En 3 secondes', color: 'violet', position: '-top-4 -left-8 lg:-left-16', delay: '0ms' },
    { icon: Sparkles, label: 'Suggestion IA', sub: 'Soutien recommandé', color: 'indigo', position: 'top-[30%] -right-6 lg:-right-14', delay: '150ms' },
    { icon: BookOpen, label: 'Quiz généré', sub: 'Personnalisé', color: 'emerald', position: 'bottom-[30%] -left-10 lg:-left-20', delay: '300ms' },
    { icon: Target, label: 'Élève en difficulté', sub: 'Détection IA', color: 'amber', position: 'bottom-4 -right-8 lg:-right-16', delay: '450ms' },
  ],
];

function HeroPremiumCard({ icon: Icon, label, sub, color, position, delay, visible }: { icon: any; label: string; sub: string; color: string; position: string; delay: string; visible: boolean }) {
  const colors: Record<string, { bg: string; text: string; ring: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
    indigo: { bg: 'bg-primary-50', text: 'text-primary', ring: 'ring-primary-100' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-100' },
  };
  const c = colors[color] || colors.indigo;

  return (
    <div
      className={`absolute ${position} z-20 hidden lg:block transition-all duration-500 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}`}
      style={{ transitionDelay: delay }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shadow-slate-200/60 p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5 border border-slate-100/80 hover:scale-105 transition-transform cursor-default animate-float">
        <div className={`w-8 h-8 sm:w-9 sm:h-9 ${c.bg} rounded-lg flex items-center justify-center ring-1 ${c.ring}`}>
          <Icon size={15} className={c.text} />
        </div>
        <div>
          <p className="text-[11px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">{label}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-500 whitespace-nowrap">{sub}</p>
        </div>
      </div>
    </div>
  );
}


function TrustBar() {
  const items = [
    { icon: Sparkles, text: 'Plateforme IA', textFull: 'Plateforme scolaire intelligente', hideOnMobile: false },
    { icon: Clock, text: 'Essai 30 jours', textFull: 'Essai gratuit 30 jours', hideOnMobile: false },
    { icon: Shield, text: 'Sécurisé', textFull: 'Hébergement sécurisé', hideOnMobile: true },
    { icon: Smartphone, text: 'Multi-plateforme', textFull: 'Web, Android et iOS', hideOnMobile: true },
  ];
  return (
    <div className="trust-bar relative z-40 overflow-hidden mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-10">
          {items.map((item, i) => (
            <div key={i} className={`flex items-center gap-1.5 text-white/95 whitespace-nowrap ${item.hideOnMobile ? 'hidden sm:flex' : ''}`}>
              <item.icon size={13} className="text-white/80" />
              <span className="text-[10px] sm:text-xs font-medium sm:hidden">{item.text}</span>
              <span className="text-xs font-medium hidden sm:inline">{item.textFull}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const slide = heroSlides[active];

  return (
    <section
      className="relative pt-10 sm:pt-12 lg:pt-16 pb-12 sm:pb-14 lg:pb-16 overflow-hidden min-h-[70vh] lg:min-h-[75vh] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]`} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
      {/* Morphing blob decorations */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04] rounded-full blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-[15%] right-[8%] w-[250px] h-[250px] bg-gradient-to-tl from-secondary/[0.05] to-primary/[0.03] rounded-full blur-[70px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="relative">
            {heroSlides.map((s, i) => (
              <div
                key={i}
                className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-[2px] absolute inset-0 pointer-events-none'}`}
              >
                <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur text-slate-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 border border-slate-200/60 shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  {s.badge}
                </div>

                <h1 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-foreground mb-6">
                  {s.title}
                </h1>

                <p className="text-[clamp(0.9rem,1.6vw,1.15rem)] text-slate-500 leading-relaxed max-w-xl mb-8 sm:mb-10">
                  {s.subtitle}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                  <a href="/create-school" className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    Essayer gratuitement 30 jours
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a href="/contact" className="group inline-flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-sm text-slate-700 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base border-2 border-slate-200/80 hover:border-primary/30 hover:bg-white hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300">
                    <Play size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    Demander une démo
                  </a>
                  <a href="#features" className="group inline-flex items-center justify-center gap-2 text-primary font-semibold text-sm sm:text-base px-5 py-3.5 sm:py-4 rounded-full hover:bg-primary/5 active:scale-[0.97] transition-all duration-200">
                    Voir en action
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-5 items-center pt-6 border-t border-slate-200/50">
                  {[
                    { icon: ShieldCheck, text: 'Sans engagement' },
                    { icon: Zap, text: 'Installation rapide' },
                    { icon: HeadphonesIcon, text: 'Support inclus' },
                    { icon: Lock, text: 'Données sécurisées' },
                    { icon: Globe, text: 'Multi-établissements' },
                  ].map((badge, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
                      <badge.icon size={14} className="text-emerald-500" />
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right — Image + floating badges + premium cards */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-[80%] h-[80%] bg-gradient-to-br ${slide.accent} rounded-full blur-3xl transition-all duration-1000`} />
            </div>

            {heroSlides.map((s, i) => (
              <div
                key={i}
                className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-[0.92] rotate-1 absolute inset-0 pointer-events-none'} flex items-center justify-center`}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={700}
                  height={400}
                  unoptimized
                  loading="eager"
                  className="relative w-[480px] sm:w-[540px] lg:w-[640px] xl:w-[700px] h-auto object-contain drop-shadow-2xl mx-auto rounded-2xl"
                />
              </div>
            ))}

            {/* Premium floating cards — specific per slide */}
            {heroPremiumCardsBySlide.map((cards, slideIdx) =>
              cards.map((card, cardIdx) => (
                <HeroPremiumCard key={`${slideIdx}-${cardIdx}`} {...card} visible={slideIdx === active} />
              ))
            )}
          </div>
        </div>

        {/* Social Proof Bar */}
        <Reveal delay={400}>
          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-500" /> Sans carte bancaire</span>
              <span className="flex items-center gap-1"><Clock size={13} className="text-blue-500" /> Installation en 5 min</span>
              <span className="flex items-center gap-1"><HeadphonesIcon size={13} className="text-amber-500" /> Support français</span>
            </div>
          </div>
        </Reveal>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-2.5 mt-6 lg:mt-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? 'w-12 bg-primary shadow-md shadow-primary/30' : 'w-2.5 bg-slate-200 hover:bg-slate-300 hover:scale-125'}`}
              aria-label={`Slide ${i + 1}`}
            >
              {i === active && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-100" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────

export default function LandingPage() {
  const { login: authLogin } = useAuth();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stats, setStats] = useState({ schools: 0, students: 0, teachers: 0, parents: 0 });
  const [schoolNames, setSchoolNames] = useState<string[]>([]);

  useEffect(() => {
    const code = searchParams.get('code');
    const tokenHash = searchParams.get('token_hash');
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    if (code || tokenHash || (token && type)) {
      const params = new URLSearchParams(window.location.search);
      window.location.href = `/verification?${params.toString()}`;
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    sbDashboard.getPublicStats().then((s: any) => { if (s) setStats(s); }).catch(() => {});
    sbSchools.list().then((schools: any[]) => {
      if (Array.isArray(schools) && schools.length > 0) {
        setSchoolNames(schools.map((s: any) => s.name).filter(Boolean));
      }
    }).catch(() => {});
  }, []);

  const nav = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Modules', href: '#modules' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Sécurité', href: '#security' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background overflow-x-hidden font-sans">

      {/* ══════════ HEADER ══════════ */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out h-16 ${scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(247,127,0,0.06)] border-b border-slate-100/60' : 'bg-white/0 backdrop-blur-0'}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <EduCILogo size="sm" />
          </a>

          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/60 rounded-full px-1.5 py-1 backdrop-blur-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary rounded-full hover:bg-white/80 transition-all duration-200">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-primary px-4 py-2 rounded-full transition-all duration-200 hover:bg-primary/5">
              Connexion
            </a>
            <a href="/create-school" className="group inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-600 active:scale-[0.96] transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25">
              Essai gratuit <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-colors" aria-label="Menu">
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100/60 shadow-xl rounded-b-2xl mx-2">
            <div className="px-4 py-4 space-y-1">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMobileMenu(false)} className="block py-3 px-4 text-base font-medium text-slate-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                  {n.label}
                </a>
              ))}
              <hr className="my-3 border-slate-100" />
              <a href="/login" className="block py-3 px-4 text-base font-semibold text-primary">Connexion</a>
            </div>
          </div>
        )}
      </header>

      {/* ══════════ TRUST BAR ══════════ */}
      <TrustBar />

      {/* ══════════ HERO SLIDER ══════════ */}
      <HeroSlider />

      {/* ══════════ TRUST MARQUEE ══════════ */}
      {schoolNames.length > 0 && (
        <section className="py-5 sm:py-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 overflow-hidden">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">ILS NOUS FONT CONFIANCE</span>
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...schoolNames, ...schoolNames, ...schoolNames].map((name, i) => (
                <div key={i} className="flex items-center gap-2.5 mx-8 sm:mx-10 text-slate-500 whitespace-nowrap">
                  <GraduationCap size={15} className="text-primary/30 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ POURQUOI EDUCI ══════════ */}
      <Section>
        <SectionHeader badge="Pourquoi EduCI" title="Pourquoi les établissements choisissent EduCI" subtitle="Une solution complète qui transforme la gestion scolaire en expérience intelligente et moderne." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Zap, title: 'Réduction de la charge administrative', desc: 'Automatisez les tâches répétitives : présences, notes, bulletins, paiements. Gagnez 10 heures par semaine.', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
            { icon: MessageSquare, title: 'Communication instantanée', desc: 'Messagerie intégrée, notifications push, SMS automatiques. Parents et enseignants connectés en temps réel.', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
            { icon: Wallet, title: 'Paiements simplifiés', desc: 'Mobile Money, cartes bancaires, virements. Relances automatiques, reçus PDF instantanés, suivi en temps réel.', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
            { icon: Clock, title: 'Suivi des présences en temps réel', desc: 'QR Code pour les élèves, géolocalisation pour les enseignants. Zéro fraude, traçabilité totale.', color: 'from-violet-500 to-purple-500', bgColor: 'bg-violet-50', textColor: 'text-violet-600' },
            { icon: Database, title: 'Centralisation des données', desc: 'Toutes les informations de votre établissement sur une seule plateforme sécurisée. Accessible 24/7.', color: 'from-rose-500 to-pink-500', bgColor: 'bg-rose-50', textColor: 'text-rose-600' },
            { icon: BarChart3, title: 'Pilotage complet de l\'établissement', desc: 'Tableaux de bord, rapports analytiques, statistiques avancées. Prenez des décisions éclairées.', color: 'from-primary to-blue-500', bgColor: 'bg-primary-50', textColor: 'text-primary' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80} direction="scale">
              <div className="premium-card rounded-2xl p-5 sm:p-6 h-full group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════ STATS ══════════ */}
      <section className="py-12 sm:py-16 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 dots-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/[0.05] rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: stats.schools, label: 'Établissements', icon: GraduationCap },
              { value: stats.students, label: 'Élèves inscrits', icon: Users },
              { value: stats.teachers, label: 'Enseignants', icon: UsersRound },
              { value: stats.parents, label: 'Parents connectés', icon: Bell },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/[0.04] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.08] group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                    <s.icon size={22} className="text-primary-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight">
                    <CountUp end={s.value} />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500/70 mt-10">Données réelles de la plateforme — mises à jour en temps réel</p>
        </div>
      </section>

      {/* ══════════ ÉCOSYSTÈME EDUCI ══════════ */}
      <Section className="bg-gradient-to-b from-white to-slate-50">
        <SectionHeader badge="Écosystème" title="Un écosystème connecté en temps réel" subtitle="De l'administration à l'élève, chaque acteur est interconnecté via une plateforme intelligente." />

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical Connector Line — stops before the badge */}
            <div className="absolute left-1/2 top-0 bottom-24 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary-400 -translate-x-1/2 hidden sm:block" />

            {/* Ecosystem Nodes */}
            <div className="space-y-6 sm:space-y-0">
              {[
                { icon: Shield, title: 'Administrateur', desc: 'Pilotage central, configuration, permissions', color: 'from-primary to-primary-500', bgColor: 'bg-primary-50', textColor: 'text-primary', borderColor: 'border-primary-200' },
                { icon: GraduationCap, title: 'Établissement', desc: 'Gestion complète, structure, classes, programmes', color: 'from-violet-500 to-violet-400', bgColor: 'bg-violet-50', textColor: 'text-violet-600', borderColor: 'border-violet-200' },
                { icon: UsersRound, title: 'Enseignants', desc: 'Cours, notes, présences, communication', color: 'from-[#059669] to-[#10B981]', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', borderColor: 'border-emerald-200' },
                { icon: Users, title: 'Élèves', desc: 'Apprentissage, bulletins, emplois du temps', color: 'from-[#0284C7] to-[#0EA5E9]', bgColor: 'bg-sky-50', textColor: 'text-sky-600', borderColor: 'border-sky-200' },
                { icon: UsersRound, title: 'Parents', desc: 'Suivi en temps réel, paiements, messages', color: 'from-[#D97706] to-[#F59E0B]', bgColor: 'bg-amber-50', textColor: 'text-amber-600', borderColor: 'border-amber-200' },
                { icon: Bot, title: 'EduCI AI', desc: 'Assistant intelligent, analyses, automatisations', color: 'from-violet-600 to-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', borderColor: 'border-purple-200' },
              ].map((node, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex items-center gap-4 sm:gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} sm:text-${i % 2 === 0 ? 'left' : 'right'}`}>
                    {/* Node Card */}
                    <div className={`flex-1 bg-white rounded-2xl p-4 sm:p-5 border ${node.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 group`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                          <node.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm sm:text-base font-bold text-slate-800">{node.title}</h4>
                          <p className="text-xs text-slate-500">{node.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Center Dot (visible on sm+) */}
                    <div className="hidden sm:flex w-4 h-4 rounded-full bg-white border-2 border-primary shadow-md z-10 animate-node-glow" />

                    {/* Spacer for alignment */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Connection Label */}
            <Reveal delay={600}>
              <div className="text-center mt-8 sm:mt-10">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-semibold border border-primary/10">
                  <Workflow size={16} />
                  Tout connecté en temps réel
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ══════════ PROBLÈMES / SOLUTIONS ══════════ */}
      <Section>
        <SectionHeader badge="Pourquoi EduCI" title="Fini les galères de la gestion scolaire" subtitle="Nous transformons les frustrations quotidiennes en solutions numériques efficaces." />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-6 flex items-center gap-2">
              <X size={16} /> Avant EduCI
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Registres papier perdus', desc: 'Des années de données élèves disparaissent lors d\'un dégât des eaux ou un vol.' },
                { title: 'Retards de paiement chroniques', desc: 'Impossible de suivre qui a payé, les relances sont manuelles et inefficaces.' },
                { title: 'Communication parents difficile', desc: 'Les parents ne sont informés qu\'aux réunions trimestrielles.' },
                { title: 'Bulletins faits à la main', desc: 'Des semaines entières consacrées aux calculs de moyennes et à l\'impression.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80} direction="left">
                  <div className="flex gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100/50 hover:border-red-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={14} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base">{item.title}</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-6 flex items-center gap-2 mt-8 lg:mt-0">
              <Check size={16} /> Avec EduCI
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Gestion numérique sécurisée', desc: 'Données cloud avec sauvegardes automatiques, accessibles 24/7 depuis tout appareil.' },
                { title: 'Paiements en ligne traçables', desc: 'Mobile Money, relances automatiques, reçus PDF instantanés pour chaque parent.' },
                { title: 'Notifications instantanées', desc: 'Absences, notes, paiements — les parents sont informés en temps réel.' },
                { title: 'Bulletins générés en 1 clic', desc: 'Calculs automatiques, mise en page professionnelle, export PDF et impression.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80} direction="right">
                  <div className="flex gap-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50 hover:border-emerald-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base">{item.title}</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════ MODULES ══════════ */}
      <Section className="bg-slate-50" id="modules">
        <SectionHeader badge="Modules" title="17 modules interconnectés pour une gestion totale" subtitle="Chaque module est conçu pour répondre à un besoin spécifique tout en s'intégrant parfaitement à l'écosystème EduCI." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            { icon: Users, title: 'Élèves', desc: 'Inscriptions en ligne, dossiers complets, historique scolaire, transferts entre classes.', benefit: 'Gagnez 5h/semaine sur les inscriptions', color: 'text-primary bg-primary-50', border: 'hover:border-primary-200' },
            { icon: UsersRound, title: 'Enseignants', desc: 'Profils détaillés, affectation matières, suivi des charges horaires, évaluation.', benefit: 'Gestion simplifiée des emplois du temps', color: 'text-violet-600 bg-violet-50', border: 'hover:border-violet-200' },
            { icon: Users, title: 'Parents', desc: 'Portail parent dédié, suivi en temps réel, messagerie directe avec les enseignants.', benefit: 'Communication transparente et instantanée', color: 'text-cyan-600 bg-cyan-50', border: 'hover:border-cyan-200' },
            { icon: Clock, title: 'Présences', desc: 'Pointage numérique automatisé, alertes d\'absence, rapports hebdomadaires.', benefit: 'Zéro fraude, 100% traçabilité', color: 'text-amber-600 bg-amber-50', border: 'hover:border-amber-200' },
            { icon: QrCode, title: 'Pointages', desc: 'QR Code personnel par élève, géolocalisation enseignant, validation instantanée.', benefit: 'Pointage en 2 secondes par élève', color: 'text-emerald-600 bg-emerald-50', border: 'hover:border-emerald-200' },
            { icon: CreditCard, title: 'Paiements', desc: 'Mobile Money, cartes bancaires, virements. Reçus PDF automatiques, relances.', benefit: 'Encaissements 3x plus rapides', color: 'text-blue-600 bg-blue-50', border: 'hover:border-blue-200' },
            { icon: FileText, title: 'Bulletins', desc: 'Génération PDF automatique, calculs de moyennes, mise en page professionnelle.', benefit: 'Bulletins prêts en 1 clic', color: 'text-rose-600 bg-rose-50', border: 'hover:border-rose-200' },
            { icon: BookOpen, title: 'Notes', desc: 'Saisie intuitive, calculs automatiques, classements, statistiques par matière.', benefit: 'Saisie et publication en temps réel', color: 'text-orange-600 bg-orange-50', border: 'hover:border-orange-200' },
            { icon: Bus, title: 'Transport', desc: 'Suivi GPS en temps réel, itinéraires, alertes de passage, gestion des chauffeurs.', benefit: 'Parents rassurés, sécurité maximale', color: 'text-teal-600 bg-teal-50', border: 'hover:border-teal-200' },
            { icon: MessageSquare, title: 'Messages', desc: 'Messagerie intégrée, envoi groupé, notifications push, SMS automatiques.', benefit: 'Communication centralisée', color: 'text-pink-600 bg-pink-50', border: 'hover:border-pink-200' },
            { icon: Sparkles, title: 'Marketplace', desc: 'Ressources pédagogiques, partage entre enseignants, contenus certifiés.', benefit: 'Bibliothèque de ressources enrichie', color: 'text-purple-600 bg-purple-50', border: 'hover:border-purple-200' },
            { icon: Bot, title: 'EduCI AI', desc: 'Assistant pédagogique IA, génération de contenus, analyse des performances.', benefit: 'L\'IA au service de la pédagogie', color: 'text-primary bg-primary-50', border: 'hover:border-primary-200' },
            { icon: Bell, title: 'Notifications', desc: 'Alertes temps réel, notifications personnalisées, historique complet.', benefit: 'Personne ne manque une info', color: 'text-red-600 bg-red-50', border: 'hover:border-red-200' },
            { icon: Calendar, title: 'Emploi du temps', desc: 'Planning automatique, gestion des salles, conflits détectés, vues hebdo/mensuelle.', benefit: 'Organisation optimisée', color: 'text-sky-600 bg-sky-50', border: 'hover:border-sky-200' },
            { icon: BookOpen, title: 'Cours', desc: 'Contenus pédagogiques, plan de cours, ressources partagées, suivi pédagogique.', benefit: 'Continuité pédagogique assurée', color: 'text-lime-600 bg-lime-50', border: 'hover:border-lime-200' },
            { icon: BarChart3, title: 'Rapports', desc: 'Tableaux de bord, statistiques avancées, exports Excel/PDF, analyses tendances.', benefit: 'Décisions basées sur les données', color: 'text-slate-600 bg-slate-100', border: 'hover:border-slate-200' },
            { icon: Layers, title: 'Paramètres', desc: 'Configuration flexible, gestion des rôles, personnalisation, archivage.', benefit: 'Adapté à votre organisation', color: 'text-gray-600 bg-gray-50', border: 'hover:border-gray-200' },
          ].map((mod, i) => (
            <Reveal key={i} delay={i * 50} direction="scale">
              <div className={`group bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 ${mod.border} hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${mod.color} group-hover:scale-110 transition-transform`}>
                    <mod.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">{mod.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{mod.desc}</p>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-[11px] font-medium text-emerald-600">{mod.benefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════ COMMENT ÇA MARCHE ══════════ */}
      <Section>
        <SectionHeader badge="Processus" title="Opérationnel en 3 étapes simples" subtitle="De l'inscription à la gestion complète en moins de 24 heures." />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[2px] bg-gradient-to-r from-primary via-secondary to-primary" />

            {[
              { step: '01', title: 'Créez votre compte', desc: 'Inscrivez votre établissement et configurez vos paramètres en 5 minutes.', icon: GraduationCap, color: 'from-primary to-primary-400' },
              { step: '02', title: 'Importez vos données', desc: 'Ajoutez élèves, enseignants et classes depuis Excel ou manuellement.', icon: Sparkles, color: 'from-secondary to-secondary-400' },
              { step: '03', title: 'Gérez tout simplement', desc: 'Notes, présences, paiements, communication — tout centralisé.', icon: Zap, color: 'from-[#059669] to-[#10B981]' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="text-center relative group">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/10 relative z-10 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <item.icon size={26} className="text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-primary/70 mb-2 block tracking-wider">{item.step}</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════ DASHBOARD SHOWCASE ══════════ */}
      <Section className="bg-slate-50">
        <SectionHeader badge="Aperçu" title="Un tableau de bord pour chaque rôle" subtitle="Directeur, enseignant, parent, comptable — chaque utilisateur a son interface optimisée." />

        <Reveal direction="scale">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-purple-200/20 to-[#60A5FA]/10 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 text-center max-w-xs mx-auto">app.educi.ci/dashboard</div>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {[
                    { label: 'Élèves', value: '—', color: 'bg-primary-500', icon: Users },
                    { label: 'Enseignants', value: '—', color: 'bg-emerald-500', icon: UsersRound },
                    { label: 'Taux de présence', value: '—', color: 'bg-amber-500', icon: Clock },
                    { label: 'Revenus', value: '—', color: 'bg-purple-500', icon: TrendingUp },
                  ].map((card, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 ${card.color} rounded-lg flex items-center justify-center`}>
                          <card.icon size={14} className="text-white" />
                        </div>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-slate-800">{card.value}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">{card.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Performance des élèves</p>
                    <div className="flex items-end gap-1 h-20 sm:h-28">
                      {[65, 72, 58, 80, 76, 85, 90, 78, 82, 88, 75, 92].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary-400 rounded-t opacity-90 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Présences aujourd'hui</p>
                    <div className="space-y-2.5">
                      {[
                        { cls: '6ème A', pct: '98%', color: 'bg-emerald-500' },
                        { cls: '5ème B', pct: '95%', color: 'bg-emerald-500' },
                        { cls: '4ème C', pct: '91%', color: 'bg-amber-500' },
                        { cls: '3ème A', pct: '97%', color: 'bg-emerald-500' },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">{c.cls}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${c.color} rounded-full`} style={{ width: c.pct }} />
                            </div>
                            <span className="text-xs font-semibold text-slate-700">{c.pct}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Role tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { role: 'Directeur', icon: '🏫', color: 'border-primary-200 bg-primary-50 text-primary-700' },
            { role: 'Enseignant', icon: '📚', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
            { role: 'Parent', icon: '👨‍👩‍👧', color: 'border-amber-200 bg-amber-50 text-amber-700' },
            { role: 'Comptable', icon: '💰', color: 'border-purple-200 bg-purple-50 text-purple-700' },
            { role: 'Élève', icon: '🎓', color: 'border-cyan-200 bg-cyan-50 text-cyan-700' },
          ].map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${r.color} hover:scale-105 transition-transform cursor-default`}>
                <span>{r.icon}</span> {r.role}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ══════════ POINTAGE ══════════ */}
      <Section id="features">
        <SectionHeader badge="Pointage intelligent" title="Suivi de présence nouvelle génération" subtitle="QR Code pour les élèves, géolocalisation pour les enseignants. Zéro friction, traçabilité totale." />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Student Process */}
          <Reveal direction="left">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                  <QrCode size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-800">Pointage Élèves</h3>
                  <p className="text-xs text-slate-500">QR Code personnel &bull; Scan en 2 secondes</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'QR Code unique', desc: 'Chaque élève reçoit un QR code personnel lié à son profil. Imprimable ou accessible via l\'app mobile.', icon: QrCode },
                  { step: '2', title: 'Scan rapide', desc: 'L\'enseignant scanne en 2 secondes depuis l\'app mobile. Aucune manipulation complexe.', icon: ScanLine },
                  { step: '3', title: 'Présence enregistrée', desc: 'Confirmation instantanée avec horodatage précis. L\'élève est marqué présent.', icon: Check },
                  { step: '4', title: 'Notification parent', desc: 'Le parent reçoit une notification push en temps réel : "Votre enfant est arrivé à l\'école".', icon: Bell },
                  { step: '5', title: 'Historique complet', desc: 'Consultez l\'historique de présence de chaque élève. Absences, retards, justificatifs — tout est tracé.', icon: BarChart3 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Teacher Process */}
          <Reveal direction="right" delay={200}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MapPinned size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-800">Pointage Enseignants</h3>
                  <p className="text-xs text-slate-500">Géolocalisation GPS &bull; Validation automatique</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Géolocalisation temps réel', desc: 'Vérification automatique de la présence dans l\'établissement via GPS. Zéro manipulation.', icon: MapPinned },
                  { step: '2', title: 'Validation de présence', desc: 'Confirmation avec horodatage précis et preuve GPS. Impossible de falsifier.', icon: ShieldCheck },
                  { step: '3', title: 'Historique complet', desc: 'Rapport mensuel, retards, absences avec justificatifs. Tout est documenté.', icon: FileText },
                  { step: '4', title: 'Rapports automatiques', desc: 'Génération de rapports de présence pour l\'administration. Export PDF en 1 clic.', icon: BarChart3 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ══════════ PAIEMENTS ══════════ */}
      <Section className="bg-slate-50">
        <SectionHeader badge="Paiements" title="Encaissez les frais de scolarité en ligne" subtitle="Mobile Money, cartes bancaires, virements — chaque transaction tracée avec reçu automatique." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            { icon: Wallet, title: 'Paiement scolarité', desc: 'Parents paient depuis l\'app mobile en 30 secondes.' },
            { icon: Receipt, title: 'Reçus automatiques', desc: 'PDF généré et envoyé au parent instantanément.' },
            { icon: BarChart3, title: 'Historique complet', desc: 'Suivi de chaque paiement, filtres par classe/période.' },
            { icon: RefreshCw, title: 'Relances intelligentes', desc: 'Rappels automatiques aux parents en retard.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <item.icon size={22} />
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
            <p className="text-sm font-semibold text-slate-700 mb-5">Passerelle de paiement intégrée</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
              {['Money Fusion (Mobile Money, Carte bancaire)'].map((gw) => (
                <div key={gw} className="bg-slate-50 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-100 text-sm font-medium text-slate-700 hover:border-primary/30 hover:text-primary transition-colors">
                  {gw}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ══════════ EDUCI AI ══════════ */}
      <Section className="bg-[#111827] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <SectionHeader
            badge="Intelligence artificielle"
            title="EduCI AI — L'assistant intelligent propulsé par DeepSeek"
            subtitle="Une IA dédiée à l'éducation, qui comprend le contexte scolaire africain et s'adapte au niveau de chaque élève."
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="space-y-4">
                {[
                  { icon: BookOpen, title: 'Assistant pédagogique', desc: 'Explique les leçons étape par étape, avec des exemples concrets adaptés au niveau et au programme scolaire de l\'élève.', color: 'from-primary to-primary-500' },
                  { icon: UsersRound, title: 'Aide aux enseignants', desc: 'Suggestions de plans de cours, correction assistée d\'examens, génération de rapports pédagogiques automatiques.', color: 'from-[#059669] to-[#10B981]' },
                  { icon: GraduationCap, title: 'Aide aux élèves', desc: 'Révisions personnalisées, quiz interactifs, explications interactives. Disponible 24/7 comme un tuteur privé.', color: 'from-[#0284C7] to-[#0EA5E9]' },
                  { icon: FileText, title: 'Génération de contenus', desc: 'Crée des quiz, exercices, résumés et fiches de révision personnalisés par matière et par niveau.', color: 'from-[#D97706] to-[#F59E0B]' },
                  { icon: RefreshCw, title: 'Automatisations', desc: 'Calcul automatique des moyennes, détection d\'élèves en difficulté, suggestions de soutien ciblé.', color: 'from-violet-600 to-purple-500' },
                  { icon: BarChart3, title: 'Analyse des données', desc: 'Tableaux de bord intelligents, prédictions de réussite, identification des tendances par classe et par matière.', color: 'from-[#E11D48] to-[#F43F5E]' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <f.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{f.title}</p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">EduCI AI</p>
                    <p className="text-[10px] text-primary-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> En ligne — Propulsé par DeepSeek
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex"><div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm text-sm max-w-[85%]">Bonjour ! Je suis EduCI AI, ton assistant pédagogique. Que veux-tu réviser aujourd'hui ?</div></div>
                  <div className="flex justify-end"><div className="bg-primary px-3 py-2 rounded-xl rounded-br-sm text-sm max-w-[85%]">J'ai un devoir sur les fractions demain, aide-moi à réviser</div></div>
                  <div className="flex"><div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm text-sm max-w-[85%]">Bien sûr ! Commençons par la base : une fraction représente une partie d'un tout. Par exemple, 3/4 signifie 3 parts sur 4. Veux-tu que je te fasse un quiz pour vérifier ta compréhension ?</div></div>
                  <div className="flex justify-end"><div className="bg-primary px-3 py-2 rounded-xl rounded-br-sm text-sm max-w-[85%]">Oui, fais-moi un quiz !</div></div>
                  <div className="flex"><div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm text-sm max-w-[85%]">
                    <p className="mb-2">Parfait ! Voici ta première question :</p>
                    <p className="font-semibold text-primary-300">Quiz : Combien font 1/2 + 1/4 ?</p>
                    <div className="mt-2 space-y-1">
                      <div className="bg-white/5 px-2 py-1 rounded text-xs">A) 2/6</div>
                      <div className="bg-primary/30 px-2 py-1 rounded text-xs border border-primary">B) 3/4 ✓</div>
                      <div className="bg-white/5 px-2 py-1 rounded text-xs">C) 2/4</div>
                    </div>
                  </div></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ══════════ APPLICATION MOBILE ══════════ */}
      <Section>
        <SectionHeader badge="Application mobile" title="EduCI dans la poche de chaque acteur" subtitle="Disponible sur Android, iPhone et tablettes. Interface adaptée à chaque rôle avec synchronisation en temps réel." />

        {/* Device Mockups */}
        <Reveal>
          <div className="flex justify-center items-end gap-4 sm:gap-6 lg:gap-8 mb-8">
            {/* Phone - Parent */}
            <div className="relative">
              <div className="w-36 sm:w-44 bg-slate-900 rounded-3xl p-2 shadow-2xl shadow-slate-300/30">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-amber-50 px-3 py-2 border-b border-amber-100">
                    <p className="text-[8px] font-bold text-amber-700">App Parent</p>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-amber-100 rounded flex items-center justify-center"><Wallet size={8} className="text-amber-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Paiement confirmé</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-violet-100 rounded flex items-center justify-center"><FileText size={8} className="text-violet-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Bulletin T2</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-emerald-100 rounded flex items-center justify-center"><Check size={8} className="text-emerald-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Présence OK</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-slate-600 mt-3">Parent</p>
            </div>

            {/* Phone - Student */}
            <div className="relative -mt-8">
              <div className="w-40 sm:w-48 bg-slate-900 rounded-3xl p-2 shadow-2xl shadow-slate-300/30">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-primary-50 px-3 py-2 border-b border-primary-100">
                    <p className="text-[8px] font-bold text-primary-700">App Élève</p>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-primary-100 rounded flex items-center justify-center"><Calendar size={8} className="text-primary" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Emploi du temps</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center"><BookOpen size={8} className="text-blue-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Notes : 15.8/20</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center"><Bot size={8} className="text-purple-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Quiz IA disponible</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-slate-600 mt-3">Élève</p>
            </div>

            {/* Phone - Teacher */}
            <div className="relative">
              <div className="w-36 sm:w-44 bg-slate-900 rounded-3xl p-2 shadow-2xl shadow-slate-300/30">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-emerald-50 px-3 py-2 border-b border-emerald-100">
                    <p className="text-[8px] font-bold text-emerald-700">App Enseignant</p>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-emerald-100 rounded flex items-center justify-center"><QrCode size={8} className="text-emerald-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Pointage QR</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center"><BookOpen size={8} className="text-blue-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Maths - 6ème A</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded">
                      <div className="w-4 h-4 bg-amber-100 rounded flex items-center justify-center"><FileText size={8} className="text-amber-600" /></div>
                      <div><p className="text-[7px] font-semibold text-slate-700">Saisie notes</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-slate-600 mt-3">Enseignant</p>
            </div>
          </div>
        </Reveal>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { role: 'Parent', icon: Users, screens: ['Suivi en temps réel des présences', 'Paiements Mobile Money sécurisés', 'Bulletins PDF téléchargeables', 'Messagerie directe avec les enseignants', 'Notifications push instantanées'], color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
            { role: 'Élève', icon: GraduationCap, screens: ['Emploi du temps interactif', 'Notes et moyennes en temps réel', 'Quiz et révisions assistés par IA', 'Devoirs et contenus de cours', 'Suivi de progression'], color: 'from-primary to-secondary', bgColor: 'bg-primary-50', textColor: 'text-primary' },
            { role: 'Enseignant', icon: UsersRound, screens: ['Saisie des notes intuitive', 'Appel numérique en 1 clic', 'Pointage GPS automatisé', 'Communication parents intégrée', 'Gestion des cours et devoirs'], color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
          ].map((app, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="premium-card rounded-2xl p-6 h-full group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <app.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-800 mb-3">App {app.role}</h3>
                <ul className="space-y-2">
                  {app.screens.map((s, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-emerald-500 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Platform Badges */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {[
            { icon: Smartphone, label: 'Android', desc: 'Google Play Store' },
            { icon: Smartphone, label: 'iPhone', desc: 'App Store' },
            { icon: Tablet, label: 'iPad', desc: 'Optimisé tablettes' },
            { icon: Tablet, label: 'Tablettes', desc: 'Android & iPad' },
            { icon: Monitor, label: 'Web App', desc: 'Tous navigateurs' },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-md transition-all cursor-default">
              <d.icon size={18} className="text-primary" />
              <div>
                <p className="text-sm font-semibold text-slate-700">{d.label}</p>
                <p className="text-[10px] text-slate-400">{d.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ══════════ SÉCURITÉ ══════════ */}
      <Section className="bg-slate-50" id="security">
        <SectionHeader badge="Sécurité" title="Vos données protégées au plus haut niveau" subtitle="Infrastructure enterprise-grade propulsée par Supabase. Chiffrement, isolation, conformité — rien n'est laissé au hasard." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {[
            { icon: Lock, title: 'Chiffrement TLS 256-bit', desc: 'Toutes les communications sont chiffrées de bout en bout. Vos données sont illisibles pour les tiers.' },
            { icon: Database, title: 'Sauvegardes automatiques', desc: 'Sauvegardes quotidiennes avec rétention de 30 jours. Restauration en un clic en cas de besoin.' },
            { icon: Shield, title: 'Isolation des données', desc: 'Architecture multi-tenant : chaque école a ses données strictement isolées. Aucun croisement possible.' },
            { icon: Fingerprint, title: 'Permissions avancées', desc: '7 rôles avec permissions granulaires configurables. Chaque utilisateur ne voit que ce qui le concerne.' },
            { icon: Eye, title: 'Conformité RGPD', desc: 'Respect total de la vie privée des élèves et parents. Droit à l\'oubli, export de données, consentement.' },
            { icon: RefreshCw, title: 'Disponibilité 99.9%', desc: 'Infrastructure cloud redondante, monitoring 24/7, failover automatique. Votre école ne s\'arrête jamais.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="premium-card rounded-2xl p-5 sm:p-6 h-full group">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon size={22} />
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Architecture Badge */}
        <Reveal>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Database size={28} className="text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-display text-lg font-bold text-slate-800 mb-1">Propulsé par Supabase</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Infrastructure open-source de classe enterprise. Base de données PostgreSQL, authentification, stockage de fichiers, edge functions et Realtime — le tout sécurisé et scalable.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['PostgreSQL', 'Auth', 'Storage', 'Edge Functions', 'Realtime'].map((tech, i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ══════════ PRICING ══════════ */}
      <Section id="pricing">
        <SectionHeader badge="Tarifs" title="Des prix simples, sans surprise" subtitle="Choisissez le plan adapté à votre établissement. Changez à tout moment, sans engagement." />

        {/* Free Trial Banner */}
        <Reveal>
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 sm:p-8 text-white text-center mb-10 max-w-3xl mx-auto shadow-lg shadow-primary/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket size={20} />
              <span className="font-display text-lg font-bold">Essai gratuit 30 jours</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-primary-100">
              <span className="flex items-center gap-1.5"><Check size={14} /> Aucune carte bancaire</span>
              <span className="flex items-center gap-1.5"><Check size={14} /> Aucun engagement</span>
              <span className="flex items-center gap-1.5"><Check size={14} /> Activation immédiate</span>
            </div>
          </div>
        </Reveal>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm font-medium ${!annual ? 'text-slate-800' : 'text-slate-400'}`}>Mensuel</span>
          <button onClick={() => setAnnual(!annual)} className={`w-14 h-7 rounded-full p-1 transition-colors ${annual ? 'bg-primary' : 'bg-slate-200'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-7' : ''}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-slate-800' : 'text-slate-400'}`}>Annuel</span>
          {annual && <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">-20%</span>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {[
            { name: 'Starter', price: annual ? '10 000' : '12 500', desc: 'Petites écoles', features: ['Jusqu\'à 100 élèves', 'Gestion de base', 'Support email', '1 admin'], cta: 'Commencer' },
            { name: 'Standard', price: annual ? '25 000' : '30 000', desc: 'Écoles moyennes', features: ['Jusqu\'à 500 élèves', 'Tous les modules', 'Mobile Money', 'Support prioritaire', '3 admins'], cta: 'Commencer', popular: true },
            { name: 'Premium', price: annual ? '50 000' : '60 000', desc: 'Grands établissements', features: ['Jusqu\'à 2000 élèves', 'EduCI AI inclus', 'Transport GPS', 'Rapports avancés', 'Admins illimités'], cta: 'Commencer' },
            { name: 'Enterprise', price: 'Sur mesure', desc: 'Groupes scolaires', features: ['Élèves illimités', 'Multi-établissements', 'API personnalisée', 'Support 24/7 dédié', 'Formation sur site'], cta: 'Nous contacter' },
          ].map((plan, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className={`relative rounded-2xl p-5 sm:p-6 h-full flex flex-col transition-all duration-300 ${plan.popular ? 'bg-gradient-to-br from-primary to-primary-600 text-white shadow-2xl shadow-primary/25 ring-2 ring-primary scale-[1.02]' : 'bg-white border border-slate-200 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1'}`}>
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
                    POPULAIRE
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className={`text-xs mt-0.5 ${plan.popular ? 'text-primary-200' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="my-5">
                  <span className="text-2xl sm:text-3xl font-bold">{plan.price}</span>
                  {plan.price !== 'Sur mesure' && <span className={`text-sm ${plan.popular ? 'text-primary-200' : 'text-slate-400'}`}> FCFA/mois</span>}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check size={15} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-primary-200' : 'text-emerald-500'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/create-school" className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${plan.popular ? 'bg-white text-primary hover:bg-primary-50 shadow-md hover:shadow-lg' : 'bg-slate-50 text-slate-700 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary'}`}>
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-8">
          <p className="text-sm text-slate-500">Tous les plans incluent : 30 jours d'essai gratuit • Sans carte bancaire • Annulation à tout moment • Support inclus</p>
        </Reveal>
      </Section>

      {/* ══════════ FAQ ══════════ */}
      <Section className="bg-slate-50" id="faq">
        <SectionHeader badge="FAQ" title="Questions fréquentes" subtitle="Tout ce que vous devez savoir sur EduCI. Trouvez rapidement les réponses à vos questions." />

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            { q: 'Combien de temps faut-il pour mettre en place EduCI ?', a: 'En moins de 24 heures, votre école est opérationnelle. L\'import des données depuis Excel prend quelques minutes seulement. Notre équipe d\'onboarding vous accompagne gratuitement during les premiers 7 jours.' },
            { q: 'L\'essai gratuit est-il vraiment sans engagement ?', a: 'Oui, 30 jours d\'essai gratuit avec accès à TOUTES les fonctionnalités. Aucune carte bancaire requise. Vous pouvez annuler à tout moment sans frais. Aucune donnée n\'est supprimée si vous décidez de vous abonner après l\'essai.' },
            { q: 'Quels moyens de paiement sont disponibles pour les parents ?', a: 'Mobile Money (Orange, MTN, Wave, Moov), cartes bancaires et virements — tous via Money Fusion, la passerelle de paiement sécurisée intégrée. Chaque paiement génère un reçu PDF automatique envoyé au parent par notification push et email.' },
            { q: 'Comment fonctionne le système de présences ?', a: 'Pour les élèves : chaque élève a un QR code personnel. L\'enseignant scanne en 2 secondes depuis l\'app mobile. Les parents reçoivent une notification push instantanée. Pour les enseignants : géolocalisation GPS avec validation automatique. Historique complet et rapports disponibles.' },
            { q: 'Comment les parents peuvent-ils payer les frais scolaires ?', a: 'Les parents téléchargent l\'app EduCI Parent, sélectionnent leur enfant, choisissent le type de frais et paient en 30 secondes via Mobile Money. Le reçu PDF est généré automatiquement et envoyé par notification push. Les relances sont automatiques pour les retards.' },
            { q: 'Comment les élèves utilisent-ils EduCI ?', a: 'Les élèves ont accès à leur emploi du temps, notes, moyennes, bulletins, devoirs et cours. Ils peuvent également utiliser EduCI AI pour réviser, faire des quiz et obtenir de l\'aide pédagogique personnalisée. L\'app est intuitive et adaptée à leur âge.' },
            { q: 'Comment les enseignants utilisent-ils EduCI ?', a: 'Les enseignants saisissent les notes, font l\'appel numérique, pointent via QR code ou GPS, consultent leurs emplois du temps, communiquent avec les parents, et accèdent à EduCI AI pour des suggestions de cours et la correction assistée.' },
            { q: 'EduCI AI fonctionne-t-il vraiment ?', a: 'Oui ! EduCI AI est propulsé par DeepSeek et entraîné sur les programmes scolaires africains. Il explique les leçons, génère des quiz, crée des fiches de révision, et analyse les performances des élèves. Il est disponible 24/7 comme un tuteur privé.' },
            { q: 'Les données sont-elles sécurisées ?', a: 'Absolument. Infrastructure Supabase (PostgreSQL), chiffrement TLS 256-bit, sauvegardes automatiques quotidiennes, isolation multi-tenant stricte (chaque école a ses données séparées), conformité RGPD. Vos données ne sont jamais partagées avec des tiers.' },
            { q: 'Puis-je migrer depuis un autre système ?', a: 'Oui ! Notre système d\'import en masse accepte Excel, CSV et la plupart des formats. Vous pouvez importer élèves, enseignants, classes, notes et historique de paiements. Notre équipe peut vous assister gratuitement pour la migration complète.' },
            { q: 'EduCI fonctionne-t-il hors connexion ?', a: 'L\'application mobile conserve les données essentielles en cache (emploi du temps, notes, présences). Les modifications se synchronisent automatiquement dès le retour de la connexion internet. Le pointage QR fonctionne même en mode dégradé.' },
            { q: 'Combien d\'utilisateurs puis-je ajouter ?', a: 'Aucune limite sur le nombre d\'enseignants ou de parents. Seul le nombre d\'élèves varie selon le plan choisi (100 à illimité). Tous les plans incluent des comptes admins illimités et des comptes enseignants/parents illimités.' },
            { q: 'Le support est-il disponible en français ?', a: 'Oui, tout le support est en français. Disponible par email, chat en direct et téléphone. Temps de réponse garanti sous 24h pour les plans Standard+. Le support Premium est disponible 24/7 avec un temps de réponse de 2h.' },
            { q: 'Puis-je gérer plusieurs établissements ?', a: 'Oui, le plan Enterprise permet la gestion multi-établissements. Chaque établissement a ses propres données, mais vous pouvez piloter le tout depuis un tableau de bord centralisé. Idéal pour les groupes scolaires et les réseaux d\'établissements.' },
            { q: 'Comment fonctionne le pointage GPS des enseignants ?', a: 'L\'enseignant ouvre l\'app EduCI, la géolocalisation vérifie automatiquement qu\'il est dans l\'établissement. La présence est validée avec horodatage précis et preuve GPS. Impossible de falsifier. L\'historique mensuel est disponible pour l\'administration.' },
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 30}>
              <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-primary/20 shadow-md shadow-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
                >
                  <span className={`text-sm sm:text-base font-semibold pr-4 transition-colors ${openFaq === i ? 'text-primary' : 'text-slate-800'}`}>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-primary/10 rotate-180' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
                    <ChevronDown size={16} className={`transition-colors ${openFaq === i ? 'text-primary' : 'text-slate-400'}`} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ maxHeight: openFaq === i ? '300px' : '0px', opacity: openFaq === i ? 1 : 0 }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-8">
          <p className="text-sm text-slate-500 mb-3">Vous n'avez pas trouvé votre réponse ?</p>
          <a href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
            Contactez notre support <ArrowRight size={14} />
          </a>
        </Reveal>
      </Section>

      {/* ══════════ CTA FINAL ══════════ */}
      <Section>
        <Reveal>
          <div className="relative bg-gradient-to-br from-primary via-primary-600 to-secondary rounded-[2rem] p-8 sm:p-10 lg:p-14 text-center text-white overflow-hidden">
            <div className="absolute inset-0 dots-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-white/[0.03] to-white/[0.06] rounded-full blur-[60px]" />

            <div className="relative z-10">
              {/* Social proof avatars */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex -space-x-2.5">
                  {['bg-primary-300', 'bg-emerald-300', 'bg-amber-300', 'bg-rose-300', 'bg-cyan-300'].map((c, i) => (
                    <div key={i} className={`w-10 h-10 ${c} rounded-full border-[2.5px] border-white/40 flex items-center justify-center text-xs font-bold text-white shadow-lg`}>
                      {['DK', 'AM', 'YC', 'SK', 'NB'][i]}
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-sm font-medium text-primary-100">
                  +{stats.schools > 0 ? stats.schools : '50'} établissements déjà inscrits
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-5">
                Prêt à transformer votre établissement ?
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10">
                Rejoignez les établissements qui ont déjà digitalisé leur gestion scolaire. Démarrez en moins de 5 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a href="/create-school" className="group relative inline-flex items-center justify-center gap-2.5 bg-white text-primary px-8 py-4 rounded-full font-bold text-base hover:bg-primary-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300 shadow-xl shadow-black/10 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-primary/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  Essayer gratuitement 30 jours <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/contact" className="group inline-flex items-center justify-center gap-2.5 bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-base border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-300 backdrop-blur-sm">
                  <Play size={16} className="group-hover:scale-110 transition-transform" /> Demander une démo
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-10 text-xs text-white/70">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Sans carte bancaire</span>
                <span className="flex items-center gap-2"><Clock size={14} /> Installation en 5 min</span>
                <span className="flex items-center gap-2"><HeadphonesIcon size={14} /> Support français</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-[#0A0F1C] text-white pt-20 pb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C] to-[#111827]/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="mb-5">
                <EduCILogo size="md" theme="dark" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
                La plateforme de gestion scolaire intelligente pour les établissements modernes en Afrique.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/[0.04] rounded-xl flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all duration-200">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Produit */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-3">
                {[['Fonctionnalités', '/features'], ['Tarifs', '/pricing'], ['Démo', '/demo'], ['API', '/api-docs'], ['Intégrations', '/integrations']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {[['À propos', '/about'], ['Équipe', '/team'], ['Carrières', '/careers'], ['Blog', '/blog'], ['Contact', '/contact']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {[['Centre d\'aide', '/help'], ['Statut', '/status'], ['Documentation', '/api-docs'], ['Conditions', '/terms'], ['Confidentialité', '/privacy']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600">
              © 2026 EduCI. Tous droits réservés.
            </p>
            <p className="text-xs text-slate-600">
              Conçu et développé en Côte d&apos;Ivoire par <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">Harouna Dev</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
