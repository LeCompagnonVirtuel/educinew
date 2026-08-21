'use client';

import { useState, useCallback } from 'react';
import { EduOSBackgroundTaskService } from '../services/eduos-background-task.service';
import { createClient } from '@/lib/supabase/client';
import type { BackgroundTask } from '@educi/types';

export const useEduOSBackgroundTaskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BackgroundTask>): Promise<BackgroundTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBackgroundTaskService(supabase);
      return await service.createBackgroundTask(schoolId, data as BackgroundTask);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BackgroundTask>): Promise<BackgroundTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBackgroundTaskService(supabase);
      return await service.updateBackgroundTask(schoolId, id, data);
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
      const service = new EduOSBackgroundTaskService(supabase);
      await service.deleteBackgroundTask(schoolId, id);
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
