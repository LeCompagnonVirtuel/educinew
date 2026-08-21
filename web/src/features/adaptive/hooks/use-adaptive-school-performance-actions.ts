'use client';

import { useState, useCallback } from 'react';
import { AdaptiveSchoolInsightsService } from '../services/adaptive-school-insights.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolInsights, SchoolInsightsCreate } from '@educi/types';

export const useAdaptiveSchoolPerformanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SchoolInsightsCreate): Promise<SchoolInsights | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSchoolInsightsService(supabase);
      return await service.createInsights(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SchoolInsightsCreate>): Promise<SchoolInsights | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSchoolInsightsService(supabase);
      return await service.updateInsights(schoolId, id, data);
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
      const service = new AdaptiveSchoolInsightsService(supabase);
      await service.deleteInsights(schoolId, id);
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
