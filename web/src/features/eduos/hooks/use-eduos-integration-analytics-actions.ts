'use client';

import { useState, useCallback } from 'react';
import { EduOSIntegrationAnalyticsService } from '../services/eduos-integration-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationAnalytics } from '@educi/types';

export const useEduOSIntegrationAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntegrationAnalytics): Promise<IntegrationAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationAnalyticsService(supabase);
      return await service.createIntegrationAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntegrationAnalytics>): Promise<IntegrationAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationAnalyticsService(supabase);
      return await service.updateIntegrationAnalytics(schoolId, id, data);
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
      const service = new EduOSIntegrationAnalyticsService(supabase);
      await service.deleteIntegrationAnalytics(schoolId, id);
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