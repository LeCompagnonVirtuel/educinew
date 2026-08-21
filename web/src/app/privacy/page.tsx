'use client';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, Users, Globe } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

export default function PrivacyPage() {
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
          <Shield className="text-[#1B4D8E]" size={32} />
          <h1 className="text-3xl font-bold text-[#111]">Politique de Confidentialité</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">Dernière mise à jour : Mai 2025</p>

        <div className="space-y-8 text-[#444] text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3 flex items-center gap-2"><Database size={18} className="text-[#4CAF50]" /> Données collectées</h2>
            <p>EduCI collecte uniquement les données nécessaires au fonctionnement de la plateforme :</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Informations d'identification (nom, email, téléphone)</li>
              <li>Données scolaires (notes, présences, bulletins)</li>
              <li>Données de paiement (montants, références de transactions)</li>
              <li>Données de géolocalisation (uniquement pour le pointage, avec consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3 flex items-center gap-2"><Lock size={18} className="text-[#1B4D8E]" /> Protection des données</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Toutes les données sont chiffrées en transit (HTTPS/TLS)</li>
              <li>Les mots de passe sont hashés avec bcrypt (irréversible)</li>
              <li>Isolation complète des données entre établissements</li>
              <li>Accès restreint par rôle (admin, enseignant, parent, élève)</li>
              <li>Sauvegardes automatiques quotidiennes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3 flex items-center gap-2"><Users size={18} className="text-[#F5A623]" /> Partage des données</h2>
            <p>EduCI ne vend, ne loue et ne partage jamais vos données personnelles avec des tiers. Les données de chaque établissement sont strictement isolées et accessibles uniquement par les utilisateurs autorisés de cet établissement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3 flex items-center gap-2"><Eye size={18} className="text-[#4CAF50]" /> Vos droits</h2>
            <p>Conformément aux réglementations en vigueur, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des informations inexactes</li>
              <li>Droit de suppression de votre compte</li>
              <li>Droit à la portabilité de vos données</li>
            </ul>
            <p className="mt-3">Pour exercer ces droits, contactez-nous à <strong>support@educi.live</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mb-3 flex items-center gap-2"><Globe size={18} className="text-[#1B4D8E]" /> Hébergement</h2>
            <p>Les données sont hébergées sur des serveurs sécurisés (Supabase, infrastructure AWS Europe). Les sauvegardes sont réalisées automatiquement et conservées de manière chiffrée.</p>
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
