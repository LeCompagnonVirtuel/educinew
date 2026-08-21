'use client';

import { useState, useCallback } from 'react';
import { EntPlatformCorrelationService } from '../services/platform-correlation.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformCorrelation, PlatformCorrelationCreate } from '@educi/types';

export const useEntPlatformCorrelationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformCorrelationCreate): Promise<PlatformCorrelation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCorrelationService(supabase);
      return await service.createPlatformCorrelation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformCorrelationCreate>): Promise<PlatformCorrelation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCorrelationService(supabase);
      return await service.updatePlatformCorrelation(schoolId, id, data);
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
      const service = new EntPlatformCorrelationService(supabase);
      await service.deletePlatformCorrelation(schoolId, id);
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
