'use client';

import { useState, useCallback } from 'react';
import { EntLogQueryService } from '../services/log-query.service';
import { createClient } from '@/lib/supabase/client';
import type { LogQuery, LogQueryCreate } from '@educi/types';

export const useEntLogQueryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogQueryCreate): Promise<LogQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogQueryService(supabase);
      return await service.createLogQuery(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogQueryCreate>): Promise<LogQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogQueryService(supabase);
      return await service.updateLogQuery(schoolId, id, data);
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
      const service = new EntLogQueryService(supabase);
      await service.deleteLogQuery(schoolId, id);
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
