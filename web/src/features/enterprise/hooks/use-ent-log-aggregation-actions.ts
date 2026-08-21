'use client';

import { useState, useCallback } from 'react';
import { EntLogAggregationService } from '../services/log-aggregation.service';
import { createClient } from '@/lib/supabase/client';
import type { LogAggregation, LogAggregationCreate } from '@educi/types';

export const useEntLogAggregationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogAggregationCreate): Promise<LogAggregation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAggregationService(supabase);
      return await service.createLogAggregation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogAggregationCreate>): Promise<LogAggregation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAggregationService(supabase);
      return await service.updateLogAggregation(schoolId, id, data);
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
      const service = new EntLogAggregationService(supabase);
      await service.deleteLogAggregation(schoolId, id);
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
