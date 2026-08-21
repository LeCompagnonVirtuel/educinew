'use client';

import { useState, useCallback } from 'react';
import { EntTraceServiceMapService } from '../services/trace-service-map.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceServiceMap, TraceServiceMapCreate } from '@educi/types';

export const useEntTraceServiceMapActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceServiceMapCreate): Promise<TraceServiceMap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceServiceMapService(supabase);
      return await service.createTraceServiceMap(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceServiceMapCreate>): Promise<TraceServiceMap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceServiceMapService(supabase);
      return await service.updateTraceServiceMap(schoolId, id, data);
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
      const service = new EntTraceServiceMapService(supabase);
      await service.deleteTraceServiceMap(schoolId, id);
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
