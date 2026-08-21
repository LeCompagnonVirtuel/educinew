'use client';

import { useState, useCallback } from 'react';
import { IntBenchmarkService } from '../services/int-benchmark.service';
import { createClient } from '@/lib/supabase/client';
import type { Benchmark, BenchmarkCreate } from '@educi/types';

export const useIntBenchmarkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: BenchmarkCreate): Promise<Benchmark | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntBenchmarkService(supabase);
      return await service.createBenchmark(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BenchmarkCreate>): Promise<Benchmark | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntBenchmarkService(supabase);
      return await service.updateBenchmark(schoolId, id, data);
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
      const service = new IntBenchmarkService(supabase);
      await service.deleteBenchmark(schoolId, id);
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