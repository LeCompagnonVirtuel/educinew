'use client';

import { useState, useCallback } from 'react';
import { AdaptiveMasteryDashboardService } from '../services/adaptive-mastery-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { MasteryDashboard, MasteryDashboardCreate } from '@educi/types';

export const useAdaptiveMasteryDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MasteryDashboardCreate): Promise<MasteryDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryDashboardService(supabase);
      return await service.createDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MasteryDashboardCreate>): Promise<MasteryDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryDashboardService(supabase);
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
      const service = new AdaptiveMasteryDashboardService(supabase);
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
