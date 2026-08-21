'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowNodeService } from '../services/eduos-workflow-node.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowNode } from '@educi/types';

export const useEduOSWorkflowNodeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowNode>): Promise<WorkflowNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowNodeService(supabase);
      return await service.createWorkflowNode(schoolId, data as WorkflowNode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowNode>): Promise<WorkflowNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowNodeService(supabase);
      return await service.updateWorkflowNode(schoolId, id, data);
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
      const service = new EduOSWorkflowNodeService(supabase);
      await service.deleteWorkflowNode(schoolId, id);
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
