'use client';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><EduCILogo size="sm" /></Link>
          <Link href="/" className="text-sm text-[#1B4D8E] font-medium hover:underline">Retour à l'accueil</Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#111] mb-3">Blog EduCI</h1>
          <p className="text-slate-500">Actualités, conseils et ressources pour l'éducation numérique en Afrique</p>
        </div>

        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <BookOpen size={48} className="mx-auto text-[#1B4D8E]/30 mb-4" />
          <h2 className="text-xl font-bold text-[#111] mb-2">Bientôt disponible</h2>
          <p className="text-slate-500 mb-6">Nos articles sur l'éducation numérique en Afrique arrivent bientôt.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-[#1B4D8E] font-semibold hover:underline">
            Être informé du lancement <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <footer className="border-t border-slate-100 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2026 EduCI. Tous droits réservés.</p>
          <p className="text-xs text-slate-400">
            Conçu et développé en Côte d&apos;Ivoire par{' '}
            <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#22D3EE] animate-pulse">Harouna Dev</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
