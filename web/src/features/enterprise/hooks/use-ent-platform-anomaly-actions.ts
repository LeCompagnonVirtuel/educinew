'use client';

import { useState, useCallback } from 'react';
import { EntPlatformAnomalyService } from '../services/platform-anomaly.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAnomaly, PlatformAnomalyCreate } from '@educi/types';

export const useEntPlatformAnomalyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformAnomalyCreate): Promise<PlatformAnomaly | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnomalyService(supabase);
      return await service.createPlatformAnomaly(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformAnomalyCreate>): Promise<PlatformAnomaly | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnomalyService(supabase);
      return await service.updatePlatformAnomaly(schoolId, id, data);
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
      const service = new EntPlatformAnomalyService(supabase);
      await service.deletePlatformAnomaly(schoolId, id);
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
