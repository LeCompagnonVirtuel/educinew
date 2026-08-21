'use client';

import { useState, useCallback } from 'react';
import { EntHealthProbeService } from '../services/health-probe.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthProbe, HealthProbeCreate } from '@educi/types';

export const useEntHealthProbeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthProbeCreate): Promise<HealthProbe | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthProbeService(supabase);
      return await service.createHealthProbe(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthProbeCreate>): Promise<HealthProbe | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthProbeService(supabase);
      return await service.updateHealthProbe(schoolId, id, data);
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
      const service = new EntHealthProbeService(supabase);
      await service.deleteHealthProbe(schoolId, id);
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
