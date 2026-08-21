'use client';

import { useState, useCallback } from 'react';
import { EntPlatformChurnService } from '../services/platform-churn.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformChurn, PlatformChurnCreate } from '@educi/types';

export const useEntPlatformChurnActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformChurnCreate): Promise<PlatformChurn | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformChurnService(supabase);
      return await service.createPlatformChurn(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformChurnCreate>): Promise<PlatformChurn | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformChurnService(supabase);
      return await service.updatePlatformChurn(schoolId, id, data);
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
      const service = new EntPlatformChurnService(supabase);
      await service.deletePlatformChurn(schoolId, id);
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
