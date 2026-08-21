'use client';

import { useState, useCallback } from 'react';
import { EntTraceFilterService } from '../services/trace-filter.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceFilter, TraceFilterCreate } from '@educi/types';

export const useEntTraceFilterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceFilterCreate): Promise<TraceFilter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceFilterService(supabase);
      return await service.createTraceFilter(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceFilterCreate>): Promise<TraceFilter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceFilterService(supabase);
      return await service.updateTraceFilter(schoolId, id, data);
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
      const service = new EntTraceFilterService(supabase);
      await service.deleteTraceFilter(schoolId, id);
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
