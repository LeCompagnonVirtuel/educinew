'use client';

import { useState, useCallback } from 'react';
import { EntPlatformCohortService } from '../services/platform-cohort.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformCohort, PlatformCohortCreate } from '@educi/types';

export const useEntPlatformCohortActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformCohortCreate): Promise<PlatformCohort | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCohortService(supabase);
      return await service.createPlatformCohort(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformCohortCreate>): Promise<PlatformCohort | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCohortService(supabase);
      return await service.updatePlatformCohort(schoolId, id, data);
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
      const service = new EntPlatformCohortService(supabase);
      await service.deletePlatformCohort(schoolId, id);
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
