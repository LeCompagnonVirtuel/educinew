'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowCompensationService } from '../services/eduos-workflow-compensation.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowCompensation } from '@educi/types';

export const useEduOSWorkflowCompensationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowCompensationService(supabase);
      return await service.createWorkflowCompensation(schoolId, data as WorkflowCompensation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowCompensationService(supabase);
      return await service.updateWorkflowCompensation(schoolId, id, data);
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
      const service = new EduOSWorkflowCompensationService(supabase);
      await service.deleteWorkflowCompensation(schoolId, id);
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
