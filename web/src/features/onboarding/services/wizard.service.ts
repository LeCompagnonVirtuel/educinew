import type { OnboardingRepository, OnboardingState, OnboardingData, OnboardingStep } from '../types';
import { OnboardingNotFoundError, OnboardingStepError } from '@educi/errors';
import { ONBOARDING_STEPS } from '@educi/types';
import { logger } from '@educi/logger';
import { AuditOnboardingService } from './audit-onboarding.service';

export class WizardService {
  constructor(
    private readonly onboardingRepo: OnboardingRepository,
    private readonly auditService: AuditOnboardingService,
  ) {}

  async getWizardState(onboardingId: string): Promise<OnboardingState> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);
    return state;
  }

  async goToStep(onboardingId: string, step: OnboardingStep): Promise<OnboardingState> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    if (!ONBOARDING_STEPS.includes(step)) {
      throw new OnboardingStepError(step, 'Étape invalide');
    }

    await this.onboardingRepo.updateProgress(onboardingId, { currentStep: step });

    await this.auditService.log({
      action: 'WIZARD_STEP_CHANGE',
      onboardingId,
      details: { step },
    });

    return { ...state, progress: { ...state.progress, currentStep: step, updatedAt: new Date().toISOString() } };
  }

  async nextStep(onboardingId: string): Promise<{ state: OnboardingState; nextStep: OnboardingStep | null }> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const currentIndex = ONBOARDING_STEPS.indexOf(state.progress.currentStep);
    if (currentIndex >= ONBOARDING_STEPS.length - 1) {
      return { state, nextStep: null };
    }

    const completedSteps = [...new Set([...state.progress.completedSteps, state.progress.currentStep])];
    const nextStep = ONBOARDING_STEPS[currentIndex + 1];

    await this.onboardingRepo.updateProgress(onboardingId, {
      currentStep: nextStep,
      completedSteps,
    });

    await this.auditService.log({
      action: 'WIZARD_NEXT_STEP',
      onboardingId,
      details: { from: state.progress.currentStep, to: nextStep },
    });

    return {
      state: {
        ...state,
        progress: { ...state.progress, currentStep: nextStep, completedSteps, updatedAt: new Date().toISOString() },
      },
      nextStep,
    };
  }

  async prevStep(onboardingId: string): Promise<{ state: OnboardingState; prevStep: OnboardingStep | null }> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const currentIndex = ONBOARDING_STEPS.indexOf(state.progress.currentStep);
    if (currentIndex <= 0) {
      return { state, prevStep: null };
    }

    const prevStep = ONBOARDING_STEPS[currentIndex - 1];
    await this.onboardingRepo.updateProgress(onboardingId, { currentStep: prevStep });

    return {
      state: {
        ...state,
        progress: { ...state.progress, currentStep: prevStep, updatedAt: new Date().toISOString() },
      },
      prevStep,
    };
  }

  async completeStep(onboardingId: string, step: OnboardingStep): Promise<void> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const completedSteps = [...new Set([...state.progress.completedSteps, step])];
    await this.onboardingRepo.updateProgress(onboardingId, { completedSteps });

    await this.auditService.log({
      action: 'WIZARD_STEP_COMPLETE',
      onboardingId,
      details: { step, completedCount: completedSteps.length },
    });
  }

  getProgressPercentage(progress: { completedSteps: OnboardingStep[] }): number {
    return Math.round((progress.completedSteps.length / ONBOARDING_STEPS.length) * 100);
  }

  getStepIndex(step: OnboardingStep): number {
    return ONBOARDING_STEPS.indexOf(step);
  }
}
