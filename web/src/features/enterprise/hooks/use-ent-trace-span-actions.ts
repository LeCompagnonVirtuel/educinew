'use client';

import { useState, useCallback } from 'react';
import { EntTraceSpanService } from '../services/trace-span.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceSpan, TraceSpanCreate } from '@educi/types';

export const useEntTraceSpanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceSpanCreate): Promise<TraceSpan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceSpanService(supabase);
      return await service.createTraceSpan(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceSpanCreate>): Promise<TraceSpan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceSpanService(supabase);
      return await service.updateTraceSpan(schoolId, id, data);
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
      const service = new EntTraceSpanService(supabase);
      await service.deleteTraceSpan(schoolId, id);
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
