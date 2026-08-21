'use client';

import { useState, useCallback } from 'react';
import { EntPlatformKPIService } from '../services/platform-kpi.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformKPI, PlatformKPICreate } from '@educi/types';

export const useEntPlatformKPIActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformKPICreate): Promise<PlatformKPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformKPIService(supabase);
      return await service.createPlatformKPI(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformKPICreate>): Promise<PlatformKPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformKPIService(supabase);
      return await service.updatePlatformKPI(schoolId, id, data);
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
      const service = new EntPlatformKPIService(supabase);
      await service.deletePlatformKPI(schoolId, id);
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
