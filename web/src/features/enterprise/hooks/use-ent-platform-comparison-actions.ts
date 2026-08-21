'use client';

import { useState, useCallback } from 'react';
import { EntPlatformComparisonService } from '../services/platform-comparison.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformComparison, PlatformComparisonCreate } from '@educi/types';

export const useEntPlatformComparisonActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformComparisonCreate): Promise<PlatformComparison | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformComparisonService(supabase);
      return await service.createPlatformComparison(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformComparisonCreate>): Promise<PlatformComparison | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformComparisonService(supabase);
      return await service.updatePlatformComparison(schoolId, id, data);
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
      const service = new EntPlatformComparisonService(supabase);
      await service.deletePlatformComparison(schoolId, id);
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
