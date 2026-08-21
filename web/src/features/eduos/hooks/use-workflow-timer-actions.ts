'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowTimerService } from '../services/eduos-workflow-timer.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowTimer } from '@educi/types';

export const useEduOSWorkflowTimerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowTimer>): Promise<WorkflowTimer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowTimerService(supabase);
      return await service.createWorkflowTimer(schoolId, data as WorkflowTimer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowTimer>): Promise<WorkflowTimer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowTimerService(supabase);
      return await service.updateWorkflowTimer(schoolId, id, data);
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
      const service = new EduOSWorkflowTimerService(supabase);
      await service.deleteWorkflowTimer(schoolId, id);
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
