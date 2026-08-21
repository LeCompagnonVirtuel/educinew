'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowRollbackService } from '../services/eduos-workflow-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowRollback } from '@educi/types';

export const useEduOSWorkflowRollbackActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowRollback>): Promise<WorkflowRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRollbackService(supabase);
      return await service.createWorkflowRollback(schoolId, data as WorkflowRollback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowRollback>): Promise<WorkflowRollback | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRollbackService(supabase);
      return await service.updateWorkflowRollback(schoolId, id, data);
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
      const service = new EduOSWorkflowRollbackService(supabase);
      await service.deleteWorkflowRollback(schoolId, id);
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
