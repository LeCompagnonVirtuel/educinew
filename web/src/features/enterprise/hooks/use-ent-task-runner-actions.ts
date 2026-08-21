'use client';

import { useState, useCallback } from 'react';
import { EntTaskRunnerService } from '../services/task-runner.service';
import { createClient } from '@/lib/supabase/client';
import type { TaskRunner, TaskRunnerCreate } from '@educi/types';

export const useEntTaskRunnerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TaskRunnerCreate): Promise<TaskRunner | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTaskRunnerService(supabase);
      return await service.createTaskRunner(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TaskRunnerCreate>): Promise<TaskRunner | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTaskRunnerService(supabase);
      return await service.updateTaskRunner(schoolId, id, data);
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
      const service = new EntTaskRunnerService(supabase);
      await service.deleteTaskRunner(schoolId, id);
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
