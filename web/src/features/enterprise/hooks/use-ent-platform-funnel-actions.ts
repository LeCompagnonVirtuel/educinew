'use client';

import { useState, useCallback } from 'react';
import { EntPlatformFunnelService } from '../services/platform-funnel.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformFunnel, PlatformFunnelCreate } from '@educi/types';

export const useEntPlatformFunnelActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformFunnelCreate): Promise<PlatformFunnel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformFunnelService(supabase);
      return await service.createPlatformFunnel(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformFunnelCreate>): Promise<PlatformFunnel | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformFunnelService(supabase);
      return await service.updatePlatformFunnel(schoolId, id, data);
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
      const service = new EntPlatformFunnelService(supabase);
      await service.deletePlatformFunnel(schoolId, id);
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
