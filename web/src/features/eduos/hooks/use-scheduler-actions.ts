'use client';

import { useState, useCallback } from 'react';
import { EduOSSchedulerService } from '../services/eduos-scheduler.service';
import { createClient } from '@/lib/supabase/client';
import type { Scheduler } from '@educi/types';

export const useEduOSSchedulerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Scheduler>): Promise<Scheduler | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchedulerService(supabase);
      return await service.createScheduler(schoolId, data as Scheduler);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Scheduler>): Promise<Scheduler | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchedulerService(supabase);
      return await service.updateScheduler(schoolId, id, data);
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
      const service = new EduOSSchedulerService(supabase);
      await service.deleteScheduler(schoolId, id);
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
