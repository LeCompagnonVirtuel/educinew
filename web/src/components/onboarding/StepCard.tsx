'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useOnboarding } from './OnboardingContext';

interface StepCardProps {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  loading?: boolean;
  canProceed?: boolean;
  hideNext?: boolean;
  hideBack?: boolean;
}

export default function StepCard({
  title, subtitle, icon, children, onNext, onBack,
  nextLabel = 'Continuer', backLabel = 'Retour', loading = false,
  canProceed = true, hideNext = false, hideBack = false,
}: StepCardProps) {
  const { nextStep, prevStep, currentStep, steps } = useOnboarding();
  const isLastStep = currentStep === steps.length - 2;

  const handleNext = () => {
    if (onNext) onNext();
    else nextStep();
  };

  const handleBack = () => {
    if (onBack) onBack();
    else prevStep();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#60A5FA] flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-[#4F46E5]/20">
            {icon}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 mb-8">
          {children}
        </div>

        {!hideNext && (
          <div className="flex items-center justify-between gap-4">
            {!hideBack && (
              <button
                onClick={handleBack}
                className="px-6 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 text-sm flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                {backLabel}
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#60A5FA] text-white rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] group"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {nextLabel}
                  {!isLastStep && <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />}
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
