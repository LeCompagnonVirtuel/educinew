'use client';

import { useState, useCallback } from 'react';
import { EntLogSearchService } from '../services/log-search.service';
import { createClient } from '@/lib/supabase/client';
import type { LogSearch, LogSearchCreate } from '@educi/types';

export const useEntLogSearchActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogSearchCreate): Promise<LogSearch | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogSearchService(supabase);
      return await service.createLogSearch(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogSearchCreate>): Promise<LogSearch | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogSearchService(supabase);
      return await service.updateLogSearch(schoolId, id, data);
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
      const service = new EntLogSearchService(supabase);
      await service.deleteLogSearch(schoolId, id);
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
