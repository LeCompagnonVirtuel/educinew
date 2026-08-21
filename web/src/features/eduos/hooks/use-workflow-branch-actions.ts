'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowBranchService } from '../services/eduos-workflow-branch.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowBranch } from '@educi/types';

export const useEduOSWorkflowBranchActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowBranch>): Promise<WorkflowBranch | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowBranchService(supabase);
      return await service.createWorkflowBranch(schoolId, data as WorkflowBranch);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowBranch>): Promise<WorkflowBranch | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowBranchService(supabase);
      return await service.updateWorkflowBranch(schoolId, id, data);
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
      const service = new EduOSWorkflowBranchService(supabase);
      await service.deleteWorkflowBranch(schoolId, id);
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
