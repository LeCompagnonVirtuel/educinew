'use client';

import { useState, useCallback } from 'react';
import { EntAPIPerformanceService } from '../services/api-performance.service';
import { createClient } from '@/lib/supabase/client';
import type { APIPerformance, APIPerformanceCreate } from '@educi/types';

export const useEntAPIPerformanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIPerformanceCreate): Promise<APIPerformance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIPerformanceService(supabase);
      return await service.createAPIPerformance(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIPerformanceCreate>): Promise<APIPerformance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIPerformanceService(supabase);
      return await service.updateAPIPerformance(schoolId, id, data);
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
      const service = new EntAPIPerformanceService(supabase);
      await service.deleteAPIPerformance(schoolId, id);
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
