'use client';

import { useState, useCallback } from 'react';
import { EntLogAlertService } from '../services/log-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { LogAlert, LogAlertCreate } from '@educi/types';

export const useEntLogAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogAlertCreate): Promise<LogAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAlertService(supabase);
      return await service.createLogAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogAlertCreate>): Promise<LogAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAlertService(supabase);
      return await service.updateLogAlert(schoolId, id, data);
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
      const service = new EntLogAlertService(supabase);
      await service.deleteLogAlert(schoolId, id);
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
