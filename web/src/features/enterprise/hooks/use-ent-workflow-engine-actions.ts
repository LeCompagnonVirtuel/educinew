'use client';

import { useState, useCallback } from 'react';
import { EntWorkflowEngineService } from '../services/workflow-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEngine, WorkflowEngineCreate } from '@educi/types';

export const useEntWorkflowEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: WorkflowEngineCreate): Promise<WorkflowEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkflowEngineService(supabase);
      return await service.createWorkflowEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WorkflowEngineCreate>): Promise<WorkflowEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkflowEngineService(supabase);
      return await service.updateWorkflowEngine(schoolId, id, data);
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
      const service = new EntWorkflowEngineService(supabase);
      await service.deleteWorkflowEngine(schoolId, id);
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
