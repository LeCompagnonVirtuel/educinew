'use client';
import Link from 'next/link';
import { Building, Shield, Users, Headphones, Zap, Globe, ArrowRight } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

const features = [
  { icon: Building, title: 'Multi-établissements', desc: 'Gérez plusieurs écoles depuis un tableau de bord unique.' },
  { icon: Users, title: 'Utilisateurs illimités', desc: 'Aucune limite sur le nombre d\'élèves, enseignants ou parents.' },
  { icon: Shield, title: 'Sécurité renforcée', desc: 'Double authentification, audit complet, chiffrement avancé.' },
  { icon: Headphones, title: 'Support prioritaire', desc: 'Équipe dédiée, temps de réponse garanti, formation sur site.' },
  { icon: Zap, title: 'Personnalisation', desc: 'Branding personnalisé, fonctionnalités sur mesure, API dédiée.' },
  { icon: Globe, title: 'Déploiement dédié', desc: 'Infrastructure isolée, SLA garanti, sauvegardes renforcées.' },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><EduCILogo size="sm" /></Link>
          <Link href="/" className="text-sm text-[#1B4D8E] font-medium hover:underline">Retour à l'accueil</Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#1B4D8E]/10 text-[#1B4D8E] px-4 py-1.5 rounded-full text-xs font-bold mb-4">ENTREPRISE</span>
          <h1 className="text-4xl font-bold text-[#111] mb-4">EduCI pour les grands groupes scolaires</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Une solution sur mesure pour les réseaux d'établissements qui ont besoin de puissance, flexibilité et accompagnement dédié.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
              <f.icon size={28} className="text-[#1B4D8E] mb-3" />
              <h3 className="font-bold text-[#111] mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#1B4D8E] to-[#2E7D32] rounded-2xl p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Demandez un devis personnalisé</h2>
          <p className="text-white/80 mb-6">Notre équipe vous accompagne dans la mise en place d'EduCI pour votre réseau d'écoles.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1B4D8E] rounded-xl font-bold hover:shadow-lg transition-shadow">
            Nous contacter <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </div>
  );
}
