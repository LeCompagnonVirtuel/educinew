'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowVersioningService } from '../services/eduos-workflow-versioning.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowVersioning } from '@educi/types';

export const useEduOSWorkflowVersioningActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVersioningService(supabase);
      return await service.createWorkflowVersioning(schoolId, data as WorkflowVersioning);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVersioningService(supabase);
      return await service.updateWorkflowVersioning(schoolId, id, data);
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
      const service = new EduOSWorkflowVersioningService(supabase);
      await service.deleteWorkflowVersioning(schoolId, id);
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
