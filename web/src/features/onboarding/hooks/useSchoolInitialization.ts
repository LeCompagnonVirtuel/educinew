'use client';

import { useState, useCallback } from 'react';
import type { OnboardingData, SchoolInitResult } from '../types';
import { createOnboardingRepository } from '../repositories';
import { SchoolInitializationService, AuditOnboardingService } from '../services';
import { logger } from '@educi/logger';

function createSchoolInitService() {
  const auditService = new AuditOnboardingService();
  return new SchoolInitializationService(auditService);
}

export function useSchoolInitialization() {
  const [result, setResult] = useState<SchoolInitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolInitService())[0];

  const initializeSchool = useCallback(async (data: OnboardingData, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const initResult = await serviceRef.initializeSchool(data, userId);
      setResult(initResult);
      logger.info('School initialized via hook', { schoolId: initResult.schoolId }, 'onboarding');
      return initResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'initialisation';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    result,
    loading,
    error,
    initializeSchool,
  };
}
