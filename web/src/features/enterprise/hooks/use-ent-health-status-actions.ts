'use client';

import { useState, useCallback } from 'react';
import { EntHealthStatusService } from '../services/health-status.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthStatus, HealthStatusCreate } from '@educi/types';

export const useEntHealthStatusActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthStatusCreate): Promise<HealthStatus | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthStatusService(supabase);
      return await service.createHealthStatus(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthStatusCreate>): Promise<HealthStatus | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthStatusService(supabase);
      return await service.updateHealthStatus(schoolId, id, data);
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
      const service = new EntHealthStatusService(supabase);
      await service.deleteHealthStatus(schoolId, id);
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
