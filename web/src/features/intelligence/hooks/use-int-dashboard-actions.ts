'use client';

import { useState, useCallback } from 'react';
import { IntDashboardService } from '../services/int-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceDashboard, IntelligenceDashboardCreate } from '@educi/types';

export const useIntDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceDashboardCreate): Promise<IntelligenceDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDashboardService(supabase);
      return await service.createDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceDashboardCreate>): Promise<IntelligenceDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDashboardService(supabase);
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
      const service = new IntDashboardService(supabase);
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
