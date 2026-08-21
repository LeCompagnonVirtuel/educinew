'use client';

import { useState, useCallback } from 'react';
import { EntPlatformAnalyticsService } from '../services/platform-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAnalytics, PlatformAnalyticsCreate } from '@educi/types';

export const useEntPlatformAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformAnalyticsCreate): Promise<PlatformAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnalyticsService(supabase);
      return await service.createPlatformAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformAnalyticsCreate>): Promise<PlatformAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnalyticsService(supabase);
      return await service.updatePlatformAnalytics(schoolId, id, data);
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
      const service = new EntPlatformAnalyticsService(supabase);
      await service.deletePlatformAnalytics(schoolId, id);
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
