'use client';
import Link from 'next/link';
import { Plug, CreditCard, Bot, MapPin, Bell, FileSpreadsheet } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

const integrations = [
  { icon: CreditCard, name: 'Money Fusion', desc: 'Passerelle de paiement unifiée (Mobile Money, cartes, virements)', category: 'Paiements', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Bot, name: 'DeepSeek AI', desc: 'Intelligence artificielle pour l\'éducation', category: 'IA', color: 'bg-purple-50 text-purple-600' },
  { icon: MapPin, name: 'GPS / Géolocalisation', desc: 'Pointage et suivi transport', category: 'Localisation', color: 'bg-green-50 text-green-600' },
  { icon: Bell, name: 'Notifications Push', desc: 'Alertes en temps réel sur mobile', category: 'Communication', color: 'bg-red-50 text-red-600' },
  { icon: FileSpreadsheet, name: 'Excel / CSV', desc: 'Import et export de données', category: 'Données', color: 'bg-emerald-50 text-emerald-600' },
];

export default function IntegrationsPage() {
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
          <Plug size={40} className="mx-auto text-[#1B4D8E] mb-4" />
          <h1 className="text-3xl font-bold text-[#111] mb-3">Intégrations</h1>
          <p className="text-slate-500">EduCI se connecte aux outils que vous utilisez déjà</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item) => (
            <div key={item.name} className="bg-white rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-[#111] text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
              <span className="inline-block mt-2 text-[10px] font-semibold text-[#1B4D8E] bg-[#EEF2FF] px-2 py-0.5 rounded-full">{item.category}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-4">Vous souhaitez une intégration spécifique ?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4D8E] text-white rounded-xl font-medium hover:bg-[#15406F]">
            Contactez-nous
          </Link>
        </div>
      </main>
    </div>
  );
}
