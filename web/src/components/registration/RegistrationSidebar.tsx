'use client';

import { useRegistration } from './RegistrationContext';
import EduCILogo from '@/components/brand/EduCILogo';
import {
  Sparkles, User, Building2, MapPin, Phone, Palette,
  GraduationCap, Puzzle, CreditCard, Shield, CheckCircle, Send,
  Cloud, CloudOff, Loader2,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Sparkles, User, Building2, MapPin, Phone, Palette,
  GraduationCap, Puzzle, CreditCard, Shield, CheckCircle, Send,
};

export default function RegistrationSidebar() {
  const { currentStep, steps, progress, syncStatus, lastSaved, isStepCompleted } = useRegistration();

  return (
    <aside className="fixed lg:static top-0 left-0 w-full lg:w-80 h-20 lg:h-screen bg-white border-b lg:border-b-0 lg:border-r border-slate-200 z-50 lg:z-auto">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-20">
        <div className="flex items-center gap-3">
          <EduCILogo size="sm" />
          <div>
            <p className="text-xs text-slate-500">Étape {currentStep + 1}/{steps.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#4F46E5]">{progress}%</span>
          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col h-full p-6">
        {/* Logo */}
        <div className="mb-8">
          <EduCILogo size="md" />
          <p className="text-xs text-slate-500 mt-1 ml-12">Inscription</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">Progression</span>
            <span className="font-bold text-[#4F46E5]">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Steps */}
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || CheckCircle;
            const isDone = isStepCompleted(i);
            const isActive = i === currentStep;
            return (
              <button
                key={step.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                  isDone ? 'bg-emerald-50 text-emerald-700' :
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' :
                  'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isDone ? 'bg-emerald-100 text-emerald-600' :
                  isActive ? 'bg-[#4F46E5]/10 text-[#4F46E5]' :
                  'bg-slate-100 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle size={14} strokeWidth={3} /> : <Icon size={14} />}
                </div>
                <span className={`text-sm font-medium ${isDone ? 'text-emerald-700' : isActive ? 'text-[#4F46E5] font-semibold' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                {isDone && <span className="ml-auto text-[10px] text-emerald-500 font-mono">✓</span>}
              </button>
            );
          })}
        </nav>

        {/* Sync status */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            {syncStatus === 'saving' ? (
              <><Loader2 size={12} className="text-[#4F46E5] animate-spin" /><span className="text-[#4F46E5]">Sauvegarde…</span></>
            ) : syncStatus === 'saved' ? (
              <><Cloud size={12} className="text-emerald-500" /><span className="text-emerald-600">Sauvegardé {lastSaved && `à ${lastSaved}`}</span></>
            ) : syncStatus === 'error' ? (
              <><CloudOff size={12} className="text-red-500" /><span className="text-red-600">Erreur de sauvegarde</span></>
            ) : (
              <><CloudOff size={12} className="text-slate-400" /><span className="text-slate-400">Hors ligne</span></>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
