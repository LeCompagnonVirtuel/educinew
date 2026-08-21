'use client';

import { useState, useCallback } from 'react';
import { EduOSLMSIntegrationService } from '../services/eduos-lms-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { LMSIntegration } from '@educi/types';

export const useEduOSLMSIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LMSIntegration): Promise<LMSIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLMSIntegrationService(supabase);
      return await service.createLMSIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LMSIntegration>): Promise<LMSIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLMSIntegrationService(supabase);
      return await service.updateLMSIntegration(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLMSIntegrationService(supabase);
      await service.deleteLMSIntegration(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};