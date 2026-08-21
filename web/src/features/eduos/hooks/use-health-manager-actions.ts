'use client';

import { useState, useCallback } from 'react';
import { EduOSHealthManagerService } from '../services/eduos-health-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthManager } from '@educi/types';

export const useEduOSHealthManagerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<HealthManager>): Promise<HealthManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHealthManagerService(supabase);
      return await service.createHealthManager(schoolId, data as HealthManager);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthManager>): Promise<HealthManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHealthManagerService(supabase);
      return await service.updateHealthManager(schoolId, id, data);
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
      const service = new EduOSHealthManagerService(supabase);
      await service.deleteHealthManager(schoolId, id);
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
