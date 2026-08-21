'use client';

import { useState, useCallback } from 'react';
import { EntIncidentWorkflowService } from '../services/incident-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentWorkflow, IncidentWorkflowCreate } from '@educi/types';

export const useEntIncidentWorkflowActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentWorkflowCreate): Promise<IncidentWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentWorkflowService(supabase);
      return await service.createIncidentWorkflow(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentWorkflowCreate>): Promise<IncidentWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentWorkflowService(supabase);
      return await service.updateIncidentWorkflow(schoolId, id, data);
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
      const service = new EntIncidentWorkflowService(supabase);
      await service.deleteIncidentWorkflow(schoolId, id);
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
