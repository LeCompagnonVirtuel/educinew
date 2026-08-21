'use client';

import { useState, useCallback } from 'react';
import { EntPerformanceBenchmarkService } from '../services/performance-benchmark.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceBenchmark, PerformanceBenchmarkCreate } from '@educi/types';

export const useEntPerformanceBenchmarkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PerformanceBenchmarkCreate): Promise<PerformanceBenchmark | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceBenchmarkService(supabase);
      return await service.createPerformanceBenchmark(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PerformanceBenchmarkCreate>): Promise<PerformanceBenchmark | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceBenchmarkService(supabase);
      return await service.updatePerformanceBenchmark(schoolId, id, data);
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
      const service = new EntPerformanceBenchmarkService(supabase);
      await service.deletePerformanceBenchmark(schoolId, id);
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
