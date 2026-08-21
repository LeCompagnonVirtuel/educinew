import type { OnboardingRepository, OnboardingData, OnboardingValidationResult } from '../types';
import { OnboardingNotFoundError, OnboardingValidationError, OnboardingCompletionError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditOnboardingService } from './audit-onboarding.service';
import { ValidationService } from './validation.service';
import { WizardService } from './wizard.service';
import { BrandingService } from './branding.service';
import { AcademicSetupService } from './academic-setup.service';
import { SchoolInitializationService } from './school-initialization.service';

export class OnboardingService {
  constructor(
    private readonly onboardingRepo: OnboardingRepository,
    private readonly auditService: AuditOnboardingService,
    private readonly validationService: ValidationService,
    private readonly wizardService: WizardService,
    private readonly brandingService: BrandingService,
    private readonly academicSetupService: AcademicSetupService,
    private readonly schoolInitService: SchoolInitializationService,
  ) {}

  async createOnboarding(userId: string) {
    const existing = await this.onboardingRepo.findByUserId(userId);
    if (existing && existing.status === 'IN_PROGRESS') {
      return existing;
    }

    const onboarding = await this.onboardingRepo.create(userId);

    await this.auditService.log({
      action: 'ONBOARDING_CREATE',
      onboardingId: onboarding.id,
      userId,
    });

    logger.info('Onboarding created', { id: onboarding.id, userId }, 'onboarding');
    return onboarding;
  }

  async getOnboarding(id: string) {
    const state = await this.onboardingRepo.findById(id);
    if (!state) throw new OnboardingNotFoundError(id);
    return state;
  }

  async getOnboardingByUserId(userId: string) {
    return this.onboardingRepo.findByUserId(userId);
  }

  async updateStepData(onboardingId: string, step: string, data: Partial<OnboardingData>) {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const validation = this.validationService.validateStep(step as any, { ...state.data, ...data } as OnboardingData);
    if (!validation.isValid) {
      throw new OnboardingValidationError(validation.errors);
    }

    const updated = await this.onboardingRepo.update(onboardingId, data);

    await this.auditService.log({
      action: 'ONBOARDING_STEP_UPDATE',
      onboardingId,
      details: { step, fields: Object.keys(data) },
    });

    return updated;
  }

  async validateOnboarding(onboardingId: string): Promise<OnboardingValidationResult> {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const result = this.validationService.validateAll(state.data);

    await this.auditService.log({
      action: 'ONBOARDING_VALIDATE',
      onboardingId,
      details: { isValid: result.isValid, errorCount: result.errors.length },
    });

    return result;
  }

  async completeOnboarding(onboardingId: string, userId: string) {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const validation = this.validationService.validateAll(state.data);
    if (!validation.isValid) {
      throw new OnboardingValidationError(validation.errors);
    }

    const result = await this.schoolInitService.initializeSchool(state.data, userId);

    await this.onboardingRepo.complete(onboardingId, result.schoolId);

    await this.auditService.log({
      action: 'ONBOARDING_COMPLETE',
      onboardingId,
      userId,
      schoolId: result.schoolId,
      details: {
        schoolName: state.data.generalInfo.name,
        directorEmail: state.data.director.email,
      },
    });

    logger.info('Onboarding completed', {
      onboardingId,
      schoolId: result.schoolId,
      directorId: result.directorId,
    }, 'onboarding');

    return result;
  }

  async deleteOnboarding(id: string) {
    const state = await this.onboardingRepo.findById(id);
    if (!state) throw new OnboardingNotFoundError(id);

    await this.onboardingRepo.delete(id);

    await this.auditService.log({
      action: 'ONBOARDING_DELETE',
      onboardingId: id,
    });

    logger.info('Onboarding deleted', { id }, 'onboarding');
  }

  async saveDraft(onboardingId: string, step: string, data: Record<string, unknown>) {
    const state = await this.onboardingRepo.findById(onboardingId);
    if (!state) throw new OnboardingNotFoundError(onboardingId);

    const updateData: Partial<OnboardingData> = {};
    (updateData as Record<string, unknown>)[step] = data;

    const updated = await this.onboardingRepo.update(onboardingId, updateData);

    await this.onboardingRepo.updateProgress(onboardingId, {
      currentStep: step as any,
    });

    return updated;
  }

  getWizardService() {
    return this.wizardService;
  }

  getBrandingService() {
    return this.brandingService;
  }

  getAcademicSetupService() {
    return this.academicSetupService;
  }

  getValidationService() {
    return this.validationService;
  }
}
