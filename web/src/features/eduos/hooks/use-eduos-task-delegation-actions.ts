'use client';

import { useState, useCallback } from 'react';
import { EduOSTaskDelegationService } from '../services/eduos-task-delegation.service';
import { createClient } from '@/lib/supabase/client';
import type { TaskDelegation } from '@educi/types';

export const useEduOSTaskDelegationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TaskDelegation): Promise<TaskDelegation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTaskDelegationService(supabase);
      return await service.createTaskDelegation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TaskDelegation>): Promise<TaskDelegation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTaskDelegationService(supabase);
      return await service.updateTaskDelegation(schoolId, id, data);
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
      const service = new EduOSTaskDelegationService(supabase);
      await service.deleteTaskDelegation(schoolId, id);
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