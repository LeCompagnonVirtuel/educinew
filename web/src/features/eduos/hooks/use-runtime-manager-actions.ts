'use client';

import { useState, useCallback } from 'react';
import { EduOSRuntimeManagerService } from '../services/eduos-runtime-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { RuntimeManager } from '@educi/types';

export const useEduOSRuntimeManagerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RuntimeManager>): Promise<RuntimeManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeManagerService(supabase);
      return await service.createRuntimeManager(schoolId, data as RuntimeManager);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RuntimeManager>): Promise<RuntimeManager | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeManagerService(supabase);
      return await service.updateRuntimeManager(schoolId, id, data);
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
      const service = new EduOSRuntimeManagerService(supabase);
      await service.deleteRuntimeManager(schoolId, id);
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
