import { describe, it, expect } from 'vitest';
import {
  OnboardingNotFoundError,
  OnboardingAlreadyCompletedError,
  OnboardingStepError,
  OnboardingValidationError,
  OnboardingDraftNotFoundError,
  OnboardingConflictError,
  OnboardingCompletionError,
  OnboardingRateLimitError,
} from '@educi/errors';

describe('Onboarding Errors', () => {
  describe('OnboardingNotFoundError', () => {
    it('should have correct defaults', () => {
      const error = new OnboardingNotFoundError();
      expect(error.message).toBe('Onboarding introuvable');
      expect(error.code).toBe('ONBOARDING_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('should include identifier', () => {
      const error = new OnboardingNotFoundError('test-123');
      expect(error.message).toContain('test-123');
    });
  });

  describe('OnboardingAlreadyCompletedError', () => {
    it('should have correct properties', () => {
      const error = new OnboardingAlreadyCompletedError();
      expect(error.code).toBe('ONBOARDING_ALREADY_COMPLETED');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('OnboardingStepError', () => {
    it('should have correct properties', () => {
      const error = new OnboardingStepError('general_info', 'Champ manquant');
      expect(error.code).toBe('ONBOARDING_STEP_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.step).toBe('general_info');
      expect(error.reason).toBe('Champ manquant');
    });
  });

  describe('OnboardingValidationError', () => {
    it('should have correct properties', () => {
      const errors = [
        { field: 'name', message: 'Requis' },
        { field: 'email', message: 'Invalide' },
      ];
      const error = new OnboardingValidationError(errors);
      expect(error.code).toBe('ONBOARDING_VALIDATION_ERROR');
      expect(error.statusCode).toBe(400);
      expect(error.errors).toHaveLength(2);
    });
  });

  describe('OnboardingDraftNotFoundError', () => {
    it('should have correct properties', () => {
      const error = new OnboardingDraftNotFoundError();
      expect(error.code).toBe('ONBOARDING_DRAFT_NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('OnboardingConflictError', () => {
    it('should have correct defaults', () => {
      const error = new OnboardingConflictError();
      expect(error.code).toBe('ONBOARDING_CONFLICT');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('OnboardingCompletionError', () => {
    it('should have correct defaults', () => {
      const error = new OnboardingCompletionError();
      expect(error.code).toBe('ONBOARDING_COMPLETION_ERROR');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('OnboardingRateLimitError', () => {
    it('should have correct properties', () => {
      const error = new OnboardingRateLimitError(60000);
      expect(error.code).toBe('ONBOARDING_RATE_LIMIT');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfterMs).toBe(60000);
    });
  });
});
