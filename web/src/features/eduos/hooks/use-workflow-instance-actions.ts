'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowInstanceService } from '../services/eduos-workflow-instance.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowInstance } from '@educi/types';

export const useEduOSWorkflowInstanceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowInstance>): Promise<WorkflowInstance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowInstanceService(supabase);
      return await service.createWorkflowInstance(schoolId, data as WorkflowInstance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowInstance>): Promise<WorkflowInstance | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowInstanceService(supabase);
      return await service.updateWorkflowInstance(schoolId, id, data);
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
      const service = new EduOSWorkflowInstanceService(supabase);
      await service.deleteWorkflowInstance(schoolId, id);
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
