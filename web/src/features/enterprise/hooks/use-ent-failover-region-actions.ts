'use client';

import { useState, useCallback } from 'react';
import { EntFailoverRegionService } from '../services/failover-region.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverRegion, FailoverRegionCreate } from '@educi/types';

export const useEntFailoverRegionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverRegionCreate): Promise<FailoverRegion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverRegionService(supabase);
      return await service.createFailoverRegion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverRegionCreate>): Promise<FailoverRegion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverRegionService(supabase);
      return await service.updateFailoverRegion(schoolId, id, data);
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
      const service = new EntFailoverRegionService(supabase);
      await service.deleteFailoverRegion(schoolId, id);
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
