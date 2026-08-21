'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import EduCILogo from '@/components/brand/EduCILogo';
import { useLanguage } from '@/hooks/useLanguage';

interface AuthLayoutProps {
  children: ReactNode;
  visualGradient?: string;
  visualIcon?: string;
  visualTitle?: string;
  visualSubtitle?: string;
}

export default function AuthLayout({
  children,
  visualGradient = 'from-primary via-primary-600 to-secondary',
  visualIcon = '🎓',
  visualTitle = 'Bienvenue sur EduCI',
  visualSubtitle = 'La plateforme éducative qui transforme l\'école africaine',
}: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Visual Panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden isolate">
        {/* Background gradient with animation */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${visualGradient} opacity-95`}
          style={{
            backgroundSize: '200% 200%',
            animation: mounted ? 'gradientShift 8s ease infinite' : 'none'
          }}
        />

        {/* Animated floating orbs */}
        <div className="absolute top-[10%] right-[15%] w-[320px] h-[320px] bg-white/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-[280px] h-[280px] bg-white/6 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[30%] w-[180px] h-[180px] bg-white/8 rounded-full blur-[60px] animate-float" style={{ animationDelay: '4s' }} />

        {/* Floating particles */}
        {mounted && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'w-1.5 h-1.5 bg-white/40' : i % 3 === 1 ? 'w-1 h-1 bg-white/25' : 'w-2 h-2 bg-white/20'} ${i % 2 === 0 ? 'animate-float' : 'animate-dot-pulse'}`}
            style={{
              top: `${15 + (i * 7) % 70}%`,
              left: `${5 + (i * 13) % 85}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + (i % 4) * 2}s`
            }}
          />
        ))}

        {/* Floating education icons */}
        {mounted && ['📚', '🎓', '✏️', '📖'].map((icon, i) => (
          <div
            key={`icon-${i}`}
            className="absolute text-2xl opacity-15 animate-icon-float"
            style={{
              top: `${20 + i * 20}%`,
              right: `${8 + (i % 2) * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${5 + i}s`,
            }}
          >
            {icon}
          </div>
        ))}

        {/* Light beam effect */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-0 w-[100px] h-[200%] bg-gradient-to-r from-transparent via-white/8 to-transparent animate-light-beam"
              style={{ animationDelay: '2s', animationDuration: '5s' }}
            />
          </div>
        )}

        {/* Modern grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M20 20v20h20V20H20zm0-20v20h20V0H20z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" aria-label="EduCI - Retour à l'accueil">
              <EduCILogo size="xl" theme="dark" />
            </Link>
          </div>

          {/* Main content */}
          <div className="max-w-md">
            <div className="mb-6">
              <span className="text-5xl mb-5 block">{visualIcon}</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
              {visualTitle}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {visualSubtitle}
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-3 mt-12">
              {[
                { icon: '🏫', label: 'Multi-écoles' },
                { icon: '📊', label: 'Temps réel' },
                { icon: '🔒', label: 'Sécurisé' },
                { icon: '🤖', label: 'IA intégrée' },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.08] backdrop-blur-lg rounded-2xl px-5 py-3.5 border border-white/[0.12] flex items-center gap-2.5 hover:bg-white/[0.14] hover:border-white/20 hover:scale-[1.04] transition-all duration-300 cursor-default shadow-lg shadow-black/5">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-sm font-semibold text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-white/30">
            © 2026 EduCI. Tous droits réservés.
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-[55%] xl:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative bg-white">
        {/* Subtle animated bg decoration */}
        <div className="absolute top-[-25%] right-[-15%] w-[50%] h-[50%] bg-gradient-to-br from-primary-100/60 to-secondary-100/40 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-tl from-violet-100/50 to-fuchsia-100/30 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="w-full max-w-md z-10">
          {/* Mobile back-to-home */}
          <div className="lg:hidden mb-6">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
