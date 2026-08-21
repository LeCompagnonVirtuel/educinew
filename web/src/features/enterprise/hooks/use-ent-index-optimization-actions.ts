'use client';

import { useState, useCallback } from 'react';
import { EntIndexOptimizationService } from '../services/index-optimization.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexOptimization, IndexOptimizationCreate } from '@educi/types';

export const useEntIndexOptimizationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexOptimizationCreate): Promise<IndexOptimization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexOptimizationService(supabase);
      return await service.createIndexOptimization(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexOptimizationCreate>): Promise<IndexOptimization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexOptimizationService(supabase);
      return await service.updateIndexOptimization(schoolId, id, data);
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
      const service = new EntIndexOptimizationService(supabase);
      await service.deleteIndexOptimization(schoolId, id);
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
