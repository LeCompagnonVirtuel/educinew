import type { MobileOnboardingRepository } from '../repositories';
import type { OnboardingData, OnboardingState } from '@educi/types';
import { logger } from '@educi/logger';

export class MobileOnboardingService {
  constructor(private readonly repo: MobileOnboardingRepository) {}

  async createOnboarding(userId: string): Promise<OnboardingState> {
    const existing = await this.repo.findByUserId(userId);
    if (existing && existing.status === 'IN_PROGRESS') {
      return existing;
    }
    return this.repo.create(userId);
  }

  async getOnboarding(id: string): Promise<OnboardingState | null> {
    return this.repo.findById(id);
  }

  async getOnboardingByUserId(userId: string): Promise<OnboardingState | null> {
    return this.repo.findByUserId(userId);
  }

  async updateStepData(onboardingId: string, step: string, data: Partial<OnboardingData>): Promise<OnboardingState> {
    return this.repo.update(onboardingId, data);
  }

  async completeOnboarding(onboardingId: string, schoolId: string): Promise<void> {
    await this.repo.complete(onboardingId, schoolId);
    logger.info('Mobile: Onboarding completed', { onboardingId, schoolId }, 'onboarding');
  }

  async deleteOnboarding(id: string): Promise<void> {
    await this.repo.delete(id);
    logger.info('Mobile: Onboarding deleted', { id }, 'onboarding');
  }
}
