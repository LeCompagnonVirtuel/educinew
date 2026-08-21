'use client';

import { useState, useCallback } from 'react';
import type { OnboardingState, OnboardingStep, OnboardingData } from '../types';
import { createOnboardingRepository } from '../repositories';
import { OnboardingService, AuditOnboardingService, ValidationService, WizardService, BrandingService, AcademicSetupService, SchoolInitializationService } from '../services';
import { logger } from '@educi/logger';

function createOnboardingService() {
  const repo = createOnboardingRepository();
  const auditService = new AuditOnboardingService();
  const validationService = new ValidationService();
  const wizardService = new WizardService(repo, auditService);
  const brandingService = new BrandingService();
  const academicSetupService = new AcademicSetupService();
  const schoolInitService = new SchoolInitializationService(auditService);

  return new OnboardingService(
    repo,
    auditService,
    validationService,
    wizardService,
    brandingService,
    academicSetupService,
    schoolInitService,
  );
}

export function useOnboarding() {
  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createOnboardingService())[0];

  const createOnboarding = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.createOnboarding(userId);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la création';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const fetchOnboarding = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.getOnboarding(id);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Onboarding introuvable';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const fetchByUserId = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.getOnboardingByUserId(userId);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const updateStepData = useCallback(async (onboardingId: string, step: string, data: Partial<OnboardingData>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.updateStepData(onboardingId, step, data);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const validateOnboarding = useCallback(async (onboardingId: string) => {
    return serviceRef.validateOnboarding(onboardingId);
  }, [serviceRef]);

  const completeOnboarding = useCallback(async (onboardingId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.completeOnboarding(onboardingId, userId);
      setOnboarding((prev) => prev ? { ...prev, status: 'COMPLETED', schoolId: result.schoolId } : null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la finalisation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const deleteOnboarding = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.deleteOnboarding(id);
      setOnboarding(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const saveDraft = useCallback(async (onboardingId: string, step: string, data: Record<string, unknown>) => {
    try {
      const result = await serviceRef.saveDraft(onboardingId, step, data);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur sauvegarde';
      setError(message);
      throw err;
    }
  }, [serviceRef]);

  return {
    onboarding,
    loading,
    error,
    createOnboarding,
    fetchOnboarding,
    fetchByUserId,
    updateStepData,
    validateOnboarding,
    completeOnboarding,
    deleteOnboarding,
    saveDraft,
  };
}
