'use client';

import { useState, useCallback } from 'react';
import { EntTracePerformanceService } from '../services/trace-performance.service';
import { createClient } from '@/lib/supabase/client';
import type { TracePerformance, TracePerformanceCreate } from '@educi/types';

export const useEntTracePerformanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TracePerformanceCreate): Promise<TracePerformance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracePerformanceService(supabase);
      return await service.createTracePerformance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TracePerformanceCreate>): Promise<TracePerformance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracePerformanceService(supabase);
      return await service.updateTracePerformance(schoolId, id, data);
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
      const service = new EntTracePerformanceService(supabase);
      await service.deleteTracePerformance(schoolId, id);
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
