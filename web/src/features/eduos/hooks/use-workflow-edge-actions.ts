'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowEdgeService } from '../services/eduos-workflow-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEdge } from '@educi/types';

export const useEduOSWorkflowEdgeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowEdge>): Promise<WorkflowEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEdgeService(supabase);
      return await service.createWorkflowEdge(schoolId, data as WorkflowEdge);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowEdge>): Promise<WorkflowEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEdgeService(supabase);
      return await service.updateWorkflowEdge(schoolId, id, data);
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
      const service = new EduOSWorkflowEdgeService(supabase);
      await service.deleteWorkflowEdge(schoolId, id);
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
