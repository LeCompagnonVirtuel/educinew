'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowRetryService } from '../services/eduos-workflow-retry.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowRetry } from '@educi/types';

export const useEduOSWorkflowRetryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowRetry>): Promise<WorkflowRetry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRetryService(supabase);
      return await service.createWorkflowRetry(schoolId, data as WorkflowRetry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowRetry>): Promise<WorkflowRetry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRetryService(supabase);
      return await service.updateWorkflowRetry(schoolId, id, data);
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
      const service = new EduOSWorkflowRetryService(supabase);
      await service.deleteWorkflowRetry(schoolId, id);
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
