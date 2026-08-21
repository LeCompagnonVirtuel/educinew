'use client';

import { useState, useCallback } from 'react';
import { EntTraceServiceService } from '../services/trace-service.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceService, TraceServiceCreate } from '@educi/types';

export const useEntTraceServiceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceServiceCreate): Promise<TraceService | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceServiceService(supabase);
      return await service.createTraceService(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceServiceCreate>): Promise<TraceService | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceServiceService(supabase);
      return await service.updateTraceService(schoolId, id, data);
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
      const service = new EntTraceServiceService(supabase);
      await service.deleteTraceService(schoolId, id);
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
