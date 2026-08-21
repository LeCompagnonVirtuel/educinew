'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowLoopService } from '../services/eduos-workflow-loop.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowLoop } from '@educi/types';

export const useEduOSWorkflowLoopActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowLoop>): Promise<WorkflowLoop | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowLoopService(supabase);
      return await service.createWorkflowLoop(schoolId, data as WorkflowLoop);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowLoop>): Promise<WorkflowLoop | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowLoopService(supabase);
      return await service.updateWorkflowLoop(schoolId, id, data);
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
      const service = new EduOSWorkflowLoopService(supabase);
      await service.deleteWorkflowLoop(schoolId, id);
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
