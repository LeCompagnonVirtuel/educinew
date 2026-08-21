'use client';
import Link from 'next/link';
import { Newspaper, Download, Mail } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';
import { supportConfig } from '@/lib/support';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><EduCILogo size="sm" /></Link>
          <Link href="/" className="text-sm text-[#1B4D8E] font-medium hover:underline">Retour à l'accueil</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Newspaper size={40} className="mx-auto text-[#1B4D8E] mb-4" />
          <h1 className="text-3xl font-bold text-[#111] mb-3">Espace Presse</h1>
          <p className="text-slate-500">Ressources médias et informations pour les journalistes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#111] mb-2">À propos d'EduCI</h3>
            <p className="text-sm text-slate-500 mb-4">EduCI est une plateforme SaaS de gestion scolaire conçue pour les établissements d'Afrique francophone. Notre mission est de digitaliser l'éducation pour la rendre plus accessible et transparente.</p>
            <p className="text-sm text-slate-500"><strong>Fondation :</strong> 2025</p>
            <p className="text-sm text-slate-500"><strong>Siège :</strong> Abidjan, Côte d'Ivoire</p>
            <p className="text-sm text-slate-500"><strong>Secteur :</strong> EdTech / SaaS</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#111] mb-2">Kit média</h3>
            <p className="text-sm text-slate-500 mb-4">Téléchargez notre logo, captures d'écran et informations pour vos publications.</p>
            <a href="/logo.svg" download className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-lg text-sm font-medium hover:bg-[#4338CA]">
              <Download size={16} /> Télécharger le logo
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-100 md:col-span-2">
            <h3 className="font-bold text-[#111] mb-2">Contact presse</h3>
            <p className="text-sm text-slate-500 mb-3">Pour toute demande d'interview, partenariat média ou information complémentaire :</p>
            <a href={`mailto:${supportConfig.emails.support}`} className="inline-flex items-center gap-2 text-[#1B4D8E] font-medium hover:underline">
              <Mail size={16} /> {supportConfig.emails.support}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
