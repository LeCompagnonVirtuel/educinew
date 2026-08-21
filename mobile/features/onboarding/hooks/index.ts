'use client';

import { useState, useCallback } from 'react';
import type { OnboardingState, OnboardingData } from '@educi/types';
import { createMobileOnboardingRepository } from '../repositories';
import { MobileOnboardingService } from '../services';
import { logger } from '@educi/logger';

function createMobileOnboardingService() {
  const repo = createMobileOnboardingRepository();
  return new MobileOnboardingService(repo);
}

export function useMobileOnboarding() {
  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createMobileOnboardingService())[0];

  const createOnboarding = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.createOnboarding(userId);
      setOnboarding(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur création';
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
      const message = err instanceof Error ? err.message : 'Erreur chargement';
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
      const message = err instanceof Error ? err.message : 'Erreur mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const completeOnboarding = useCallback(async (onboardingId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.completeOnboarding(onboardingId, schoolId);
      setOnboarding((prev) => prev ? { ...prev, status: 'COMPLETED', schoolId } : null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur finalisation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    onboarding,
    loading,
    error,
    createOnboarding,
    fetchOnboarding,
    updateStepData,
    completeOnboarding,
  };
}
