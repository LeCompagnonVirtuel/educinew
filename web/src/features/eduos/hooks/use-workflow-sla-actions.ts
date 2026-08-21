'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowSLAService } from '../services/eduos-workflow-sla.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowSLA } from '@educi/types';

export const useEduOSWorkflowSLAActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowSLA>): Promise<WorkflowSLA | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowSLAService(supabase);
      return await service.createWorkflowSLA(schoolId, data as WorkflowSLA);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowSLA>): Promise<WorkflowSLA | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowSLAService(supabase);
      return await service.updateWorkflowSLA(schoolId, id, data);
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
      const service = new EduOSWorkflowSLAService(supabase);
      await service.deleteWorkflowSLA(schoolId, id);
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
