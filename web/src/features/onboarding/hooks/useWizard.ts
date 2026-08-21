'use client';

import { useReducer, useCallback, useState } from 'react';
import type { OnboardingState, OnboardingStep, OnboardingData, WizardState, WizardAction } from '../types';
import { ONBOARDING_STEPS } from '@educi/types';
import { createOnboardingRepository } from '../repositories';
import { WizardService, AuditOnboardingService } from '../services';
import { logger } from '@educi/logger';

const initialData: OnboardingData = {
  generalInfo: { name: '', email: '', country: "Côte d'Ivoire" },
  adminInfo: { schoolType: 'PRIVE', languages: ['fr'], currency: 'XOF', timezone: 'Africa/Abidjan' },
  academicConfig: {
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    yearStartDate: '', yearEndDate: '',
    termsCount: 3, semestersCount: 2, gradingSystem: 'FRENCH_20',
    passingGrade: 10, mentionThresholds: { 'Bien': 14, 'Très Bien': 16, 'Excellent': 18 },
    coefficientSystem: false,
  },
  pedagogicStructure: { levels: [] },
  director: { firstName: '', lastName: '', email: '', password: '' },
  modules: {
    payments: false, transport: false, library: false, cafeteria: false,
    health: false, discipline: false, marketplace: false, hr: false,
    gps: false, exams: true, sms: false, ai: false,
  },
  branding: { colorPrimary: '#1E40AF', colorSecondary: '#3B82F6' },
};

const initialWizardState: WizardState = {
  currentStep: 'general_info',
  completedSteps: [],
  data: initialData,
  isValidating: false,
  errors: [],
  warnings: [],
  isSubmitting: false,
  isComplete: false,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'NEXT_STEP': {
      const currentIndex = ONBOARDING_STEPS.indexOf(state.currentStep);
      if (currentIndex >= ONBOARDING_STEPS.length - 1) return state;
      return { ...state, currentStep: ONBOARDING_STEPS[currentIndex + 1] };
    }
    case 'PREV_STEP': {
      const currentIndex = ONBOARDING_STEPS.indexOf(state.currentStep);
      if (currentIndex <= 0) return state;
      return { ...state, currentStep: ONBOARDING_STEPS[currentIndex - 1] };
    }
    case 'UPDATE_DATA': {
      const stepKey = action.step === 'general_info' ? 'generalInfo'
        : action.step === 'admin_info' ? 'adminInfo'
        : action.step === 'academic_config' ? 'academicConfig'
        : action.step === 'pedagogic_structure' ? 'pedagogicStructure'
        : action.step === 'director_creation' ? 'director'
        : action.step === 'modules' ? 'modules'
        : action.step === 'branding' ? 'branding'
        : null;

      if (!stepKey) return state;

      return {
        ...state,
        data: {
          ...state.data,
          [stepKey]: { ...(state.data as any)[stepKey], ...action.data },
        },
      };
    }
    case 'COMPLETE_STEP': {
      const completedSteps = [...new Set([...state.completedSteps, action.step])];
      return { ...state, completedSteps };
    }
    case 'SET_VALIDATING':
      return { ...state, isValidating: action.validating };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors, isValidating: false };
    case 'SET_WARNINGS':
      return { ...state, warnings: action.warnings };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.submitting };
    case 'SET_COMPLETE':
      return { ...state, isComplete: action.complete };
    case 'RESET':
      return initialWizardState;
    default:
      return state;
  }
}

function createWizardService() {
  const repo = createOnboardingRepository();
  const auditService = new AuditOnboardingService();
  return new WizardService(repo, auditService);
}

export function useWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);
  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null);
  const serviceRef = useState(createWizardService())[0];

  const goToStep = useCallback((step: OnboardingStep) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const updateData = useCallback((step: OnboardingStep, data: Partial<OnboardingData>) => {
    dispatch({ type: 'UPDATE_DATA', step, data });
  }, []);

  const completeStep = useCallback((step: OnboardingStep) => {
    dispatch({ type: 'COMPLETE_STEP', step });
  }, []);

  const getProgress = useCallback(() => {
    return Math.round((state.completedSteps.length / ONBOARDING_STEPS.length) * 100);
  }, [state.completedSteps]);

  const getStepIndex = useCallback((step: OnboardingStep) => {
    return ONBOARDING_STEPS.indexOf(step);
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    onboarding,
    goToStep,
    nextStep,
    prevStep,
    updateData,
    completeStep,
    getProgress,
    getStepIndex,
    reset,
    setOnboarding,
  };
}
