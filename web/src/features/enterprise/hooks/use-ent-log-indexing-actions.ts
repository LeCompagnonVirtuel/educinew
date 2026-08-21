'use client';

import { useState, useCallback } from 'react';
import { EntLogIndexingService } from '../services/log-indexing.service';
import { createClient } from '@/lib/supabase/client';
import type { LogIndexing, LogIndexingCreate } from '@educi/types';

export const useEntLogIndexingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogIndexingCreate): Promise<LogIndexing | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogIndexingService(supabase);
      return await service.createLogIndexing(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogIndexingCreate>): Promise<LogIndexing | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogIndexingService(supabase);
      return await service.updateLogIndexing(schoolId, id, data);
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
      const service = new EntLogIndexingService(supabase);
      await service.deleteLogIndexing(schoolId, id);
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
