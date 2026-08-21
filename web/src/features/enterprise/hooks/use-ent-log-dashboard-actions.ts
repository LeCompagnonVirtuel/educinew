'use client';

import { useState, useCallback } from 'react';
import { EntLogDashboardService } from '../services/log-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { LogDashboard, LogDashboardCreate } from '@educi/types';

export const useEntLogDashboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogDashboardCreate): Promise<LogDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogDashboardService(supabase);
      return await service.createLogDashboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogDashboardCreate>): Promise<LogDashboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogDashboardService(supabase);
      return await service.updateLogDashboard(schoolId, id, data);
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
      const service = new EntLogDashboardService(supabase);
      await service.deleteLogDashboard(schoolId, id);
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
