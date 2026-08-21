'use client';

import { useState, useCallback } from 'react';
import { AdaptiveCompetencyDashboardService } from '../services/adaptive-competency-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyDashboard, CompetencyDashboardCreate } from '@educi/types';

export const useAdaptiveCompetencyDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CompetencyDashboardCreate): Promise<CompetencyDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyDashboardService(supabase);
      return await service.createDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CompetencyDashboardCreate>): Promise<CompetencyDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyDashboardService(supabase);
      return await service.updateDashboard(schoolId, id, data);
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
      const service = new AdaptiveCompetencyDashboardService(supabase);
      await service.deleteDashboard(schoolId, id);
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
