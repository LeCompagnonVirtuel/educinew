'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowConditionService } from '../services/eduos-workflow-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowCondition } from '@educi/types';

export const useEduOSWorkflowConditionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowCondition>): Promise<WorkflowCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowConditionService(supabase);
      return await service.createWorkflowCondition(schoolId, data as WorkflowCondition);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowCondition>): Promise<WorkflowCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowConditionService(supabase);
      return await service.updateWorkflowCondition(schoolId, id, data);
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
      const service = new EduOSWorkflowConditionService(supabase);
      await service.deleteWorkflowCondition(schoolId, id);
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
