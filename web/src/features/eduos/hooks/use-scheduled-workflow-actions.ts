'use client';

import { useState, useCallback } from 'react';
import { EduOSScheduledWorkflowService } from '../services/eduos-scheduled-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { ScheduledWorkflow } from '@educi/types';

export const useEduOSScheduledWorkflowActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScheduledWorkflowService(supabase);
      return await service.createScheduledWorkflow(schoolId, data as ScheduledWorkflow);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScheduledWorkflowService(supabase);
      return await service.updateScheduledWorkflow(schoolId, id, data);
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
      const service = new EduOSScheduledWorkflowService(supabase);
      await service.deleteScheduledWorkflow(schoolId, id);
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
