'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowVariableService } from '../services/eduos-workflow-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowVariable } from '@educi/types';

export const useEduOSWorkflowVariableActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowVariable>): Promise<WorkflowVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVariableService(supabase);
      return await service.createWorkflowVariable(schoolId, data as WorkflowVariable);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowVariable>): Promise<WorkflowVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVariableService(supabase);
      return await service.updateWorkflowVariable(schoolId, id, data);
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
      const service = new EduOSWorkflowVariableService(supabase);
      await service.deleteWorkflowVariable(schoolId, id);
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
