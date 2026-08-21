'use client';

import { useRegistration } from '@/components/registration/RegistrationContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Building2, MapPin, Phone, Palette, GraduationCap, Puzzle, CreditCard, Shield, CheckCircle, AlertTriangle, Edit3 } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: any;
  stepIndex: number;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, stepIndex, children }: SectionProps) {
  const { setStep } = useRegistration();
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#4F46E5]" />
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        </div>
        <button onClick={() => setStep(stepIndex)} className="p-1.5 text-slate-400 hover:text-[#4F46E5] transition-colors">
          <Edit3 size={14} />
        </button>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800 text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

export default function StepReview() {
  const { data, nextStep, prevStep } = useRegistration();
  const { personal, school, location, contacts, branding, academic, modules, payments, security } = data;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Résumé de l'inscription</h2>
        <p className="text-sm text-slate-500">Vérifiez vos informations avant de valider.</p>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        <Section title="Propriétaire" icon={User} stepIndex={1}>
          <Field label="Nom" value={`${personal.firstName} ${personal.lastName}`} />
          <Field label="Email" value={personal.email} />
          <Field label="Téléphone" value={personal.phone} />
          <Field label="Nationalité" value={personal.nationality} />
        </Section>

        <Section title="Établissement" icon={Building2} stepIndex={2}>
          <Field label="Nom officiel" value={school.officialName} />
          <Field label="Type" value={school.type} />
          <Field label="Visibilité" value={school.visibility} />
          <Field label="Acronyme" value={school.acronym} />
        </Section>

        <Section title="Localisation" icon={MapPin} stepIndex={3}>
          <Field label="Pays" value={location.country} />
          <Field label="Ville" value={location.city} />
          <Field label="Commune" value={location.commune} />
          <Field label="Adresse" value={location.fullAddress} />
        </Section>

        <Section title="Contacts" icon={Phone} stepIndex={4}>
          <Field label="Téléphone" value={contacts.phonePrimary} />
          <Field label="Email" value={contacts.emailPrimary} />
          <Field label="Site web" value={contacts.website} />
        </Section>

        <Section title="Branding" icon={Palette} stepIndex={5}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: branding.primaryColor }} />
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: branding.secondaryColor }} />
            <span className="text-sm text-slate-600 ml-2">{branding.typography}</span>
          </div>
          <Field label="Slogan" value={branding.slogan} />
        </Section>

        <Section title="Académique" icon={GraduationCap} stepIndex={6}>
          <Field label="Année" value={academic.academicYear} />
          <Field label="Cycles" value={academic.cycles.join(', ')} />
          <Field label="Niveaux" value={academic.levels.join(', ')} />
          <Field label="Matières" value={`${academic.subjects.length} matière(s)`} />
        </Section>

        <Section title="Modules" icon={Puzzle} stepIndex={7}>
          <p className="text-sm text-slate-600">{modules.length} module(s) activé(s)</p>
          <div className="flex flex-wrap gap-1">
            {modules.slice(0, 8).map(m => (
              <span key={m} className="px-2 py-0.5 bg-[#4F46E5]/10 text-[#4F46E5] text-xs rounded-full">{m}</span>
            ))}
            {modules.length > 8 && <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">+{modules.length - 8}</span>}
          </div>
        </Section>

        <Section title="Paiements" icon={CreditCard} stepIndex={8}>
          <div className="flex flex-wrap gap-1">
            {payments.mobileMoney && <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-full">Mobile Money</span>}
            {payments.bankCards && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">Cartes</span>}
            {payments.transfers && <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">Virements</span>}
            {payments.cash && <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full">Espèces</span>}
          </div>
        </Section>

        <Section title="Sécurité" icon={Shield} stepIndex={9}>
          <Field label="Niveau" value={security.securityLevel} />
          <Field label="Max admins" value={String(security.maxAdmins)} />
          <Field label="Délégation" value={security.allowDelegation ? 'Oui' : 'Non'} />
        </Section>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={prevStep} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <button onClick={nextStep} className="flex-[2] py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
          Valider et envoyer <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
