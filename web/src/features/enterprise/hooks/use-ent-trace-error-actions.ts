'use client';

import { useState, useCallback } from 'react';
import { EntTraceErrorService } from '../services/trace-error.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceError, TraceErrorCreate } from '@educi/types';

export const useEntTraceErrorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceErrorCreate): Promise<TraceError | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceErrorService(supabase);
      return await service.createTraceError(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceErrorCreate>): Promise<TraceError | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceErrorService(supabase);
      return await service.updateTraceError(schoolId, id, data);
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
      const service = new EntTraceErrorService(supabase);
      await service.deleteTraceError(schoolId, id);
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
