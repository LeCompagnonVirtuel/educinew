'use client';
import Link from 'next/link';
import { FileText, CheckCircle } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><EduCILogo size="sm" /></Link>
          <Link href="/" className="text-sm text-[#1B4D8E] font-medium hover:underline">Retour à l'accueil</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-[#1B4D8E]" size={32} />
          <h1 className="text-3xl font-bold text-[#111]">Conditions Générales d'Utilisation</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">Dernière mise à jour : Mai 2025</p>

        <div className="space-y-8 text-[#444] text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">1. Objet</h2>
            <p>Les présentes conditions régissent l'utilisation de la plateforme EduCI, service de gestion scolaire numérique accessible via le web et l'application mobile.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">2. Inscription</h2>
            <p>L'inscription à EduCI est réservée aux établissements scolaires. L'administrateur de l'établissement est responsable de la création des comptes utilisateurs (enseignants, parents, élèves) au sein de son établissement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">3. Responsabilités de l'utilisateur</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintenir la confidentialité de ses identifiants de connexion</li>
              <li>Fournir des informations exactes et à jour</li>
              <li>Ne pas tenter d'accéder aux données d'autres établissements</li>
              <li>Respecter les droits des autres utilisateurs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">4. Abonnement et paiement</h2>
            <p>EduCI propose différents plans d'abonnement. L'accès aux fonctionnalités dépend du plan souscrit. Le paiement peut être effectué mensuellement ou annuellement. Un essai gratuit de 14 jours est offert à chaque nouvel établissement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">5. Propriété intellectuelle</h2>
            <p>La plateforme EduCI, son design, son code source et ses fonctionnalités sont la propriété exclusive d'EduCI. Les données saisies par les utilisateurs restent leur propriété.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">6. Résiliation</h2>
            <p>L'utilisateur peut résilier son abonnement à tout moment. Les données seront conservées pendant 30 jours après la résiliation, puis supprimées définitivement sur demande.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3">7. Contact</h2>
            <p>Pour toute question relative aux présentes conditions : <strong>support@educi.live</strong></p>
          </section>
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
