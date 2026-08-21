'use client';

import { useState, useCallback } from 'react';
import { EntPlatformGrowthService } from '../services/platform-growth.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformGrowth, PlatformGrowthCreate } from '@educi/types';

export const useEntPlatformGrowthActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformGrowthCreate): Promise<PlatformGrowth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformGrowthService(supabase);
      return await service.createPlatformGrowth(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformGrowthCreate>): Promise<PlatformGrowth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformGrowthService(supabase);
      return await service.updatePlatformGrowth(schoolId, id, data);
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
      const service = new EntPlatformGrowthService(supabase);
      await service.deletePlatformGrowth(schoolId, id);
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
