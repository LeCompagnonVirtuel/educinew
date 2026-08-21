'use client';

import { useState, useCallback } from 'react';
import { EntTraceLatencyService } from '../services/trace-latency.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceLatency, TraceLatencyCreate } from '@educi/types';

export const useEntTraceLatencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceLatencyCreate): Promise<TraceLatency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceLatencyService(supabase);
      return await service.createTraceLatency(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceLatencyCreate>): Promise<TraceLatency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceLatencyService(supabase);
      return await service.updateTraceLatency(schoolId, id, data);
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
      const service = new EntTraceLatencyService(supabase);
      await service.deleteTraceLatency(schoolId, id);
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
