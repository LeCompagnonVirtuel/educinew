'use client';

import { useOnboarding } from './OnboardingContext';
import { Check, Cloud, CloudOff, Loader2, Wifi } from 'lucide-react';
import EduCILogo from '@/components/brand/EduCILogo';

export default function ProgressSidebar() {
  const { currentStep, steps, progress, syncStatus, lastSaved } = useOnboarding();

  const syncIndicator = () => {
    switch (syncStatus) {
      case 'saving':
        return <span className="flex items-center gap-1.5 text-[10px] text-white/40"><Loader2 size={10} className="animate-spin" /> Sauvegarde...</span>;
      case 'saved':
        return <span className="flex items-center gap-1.5 text-[10px] text-[#10B981]"><Cloud size={10} /> Synchronisé{lastSaved && ` · ${lastSaved}`}</span>;
      case 'offline':
        return <span className="flex items-center gap-1.5 text-[10px] text-amber-400"><CloudOff size={10} /> Hors ligne</span>;
      case 'error':
        return <span className="flex items-center gap-1.5 text-[10px] text-red-400"><CloudOff size={10} /> Erreur sync</span>;
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#080E1E] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">E</span>
            </div>
            <span className="text-xs font-semibold text-white">EduCI</span>
          </div>
          <div className="flex items-center gap-3">
            {syncIndicator()}
            <span className="text-xs font-bold text-[#60A5FA]">{progress}%</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-white/40">Étape {currentStep + 1}/{steps.length}</span>
          <span className="text-[10px] text-white/60 font-medium">{steps[currentStep]?.label}</span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-[320px] xl:w-[360px] bg-[#080E1E] relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-[#8B5CF6]/10" />
        <div className="absolute top-[10%] right-[20%] w-[200px] h-[200px] bg-[#4F46E5]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[15%] left-[10%] w-[150px] h-[150px] bg-[#8B5CF6]/10 rounded-full blur-[60px]" />

        <div className="relative z-10 p-8 flex flex-col h-full">
          <div className="mb-8">
            <EduCILogo size="md" theme="dark" />
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Progression</span>
              <span className="text-sm font-bold text-[#60A5FA]">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2">{syncIndicator()}</div>
          </div>

          {/* Steps */}
          <div className="flex-1 space-y-0.5 overflow-y-auto custom-scrollbar pr-2">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-[#4F46E5]/20 border border-[#4F46E5]/30'
                      : isCompleted
                      ? 'bg-white/5'
                      : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/30'
                        : isCompleted
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : step.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[13px] font-medium truncate ${
                        isActive ? 'text-white' : isCompleted ? 'text-white/70' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <Wifi size={12} className="text-[#10B981]" />
              <span className="text-[10px] text-white/30">Sauvegarde automatique activée</span>
            </div>
            <p className="text-[10px] text-white/20">Reprenez à tout moment sur n&apos;importe quel appareil</p>
          </div>
        </div>
      </div>
    </>
  );
}
