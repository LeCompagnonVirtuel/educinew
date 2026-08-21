'use client';

import { useState, useCallback } from 'react';
import { EduOSHealthCheckService } from '../services/eduos-health-check.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthCheck } from '@educi/types';

export const useEduOSHealthCheckActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<HealthCheck>): Promise<HealthCheck | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHealthCheckService(supabase);
      return await service.createHealthCheck(schoolId, data as HealthCheck);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthCheck>): Promise<HealthCheck | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHealthCheckService(supabase);
      return await service.updateHealthCheck(schoolId, id, data);
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
      const service = new EduOSHealthCheckService(supabase);
      await service.deleteHealthCheck(schoolId, id);
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
