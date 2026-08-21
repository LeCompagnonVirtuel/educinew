'use client';

import { useState, useCallback } from 'react';
import { EntSearchAnalyticsService } from '../services/search-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchAnalytics, SearchAnalyticsCreate } from '@educi/types';

export const useEntSearchAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchAnalyticsCreate): Promise<SearchAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAnalyticsService(supabase);
      return await service.createSearchAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchAnalyticsCreate>): Promise<SearchAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAnalyticsService(supabase);
      return await service.updateSearchAnalytics(schoolId, id, data);
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
      const service = new EntSearchAnalyticsService(supabase);
      await service.deleteSearchAnalytics(schoolId, id);
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
