'use client';

import { useState, useCallback } from 'react';
import { EduOSGovernanceAnalyticsService } from '../services/eduos-governance-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernanceAnalytics } from '@educi/types';

export const useEduOSGovernanceAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernanceAnalyticsService(supabase);
      return await service.createGovernanceAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernanceAnalyticsService(supabase);
      return await service.updateGovernanceAnalytics(schoolId, id, data);
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
      const service = new EduOSGovernanceAnalyticsService(supabase);
      await service.deleteGovernanceAnalytics(schoolId, id);
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
