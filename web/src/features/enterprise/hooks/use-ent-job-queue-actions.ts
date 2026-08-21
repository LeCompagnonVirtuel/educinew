'use client';

import { useState, useCallback } from 'react';
import { EntJobQueueService } from '../services/job-queue.service';
import { createClient } from '@/lib/supabase/client';
import type { JobQueue, JobQueueCreate } from '@educi/types';

export const useEntJobQueueActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: JobQueueCreate): Promise<JobQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJobQueueService(supabase);
      return await service.createJobQueue(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<JobQueueCreate>): Promise<JobQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJobQueueService(supabase);
      return await service.updateJobQueue(schoolId, id, data);
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
      const service = new EntJobQueueService(supabase);
      await service.deleteJobQueue(schoolId, id);
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
