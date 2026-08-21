'use client';

import { useState, useCallback } from 'react';
import { EduOSWorkflowEscalationService } from '../services/eduos-workflow-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEscalation } from '@educi/types';

export const useEduOSWorkflowEscalationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEscalationService(supabase);
      return await service.createWorkflowEscalation(schoolId, data as WorkflowEscalation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEscalationService(supabase);
      return await service.updateWorkflowEscalation(schoolId, id, data);
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
      const service = new EduOSWorkflowEscalationService(supabase);
      await service.deleteWorkflowEscalation(schoolId, id);
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
