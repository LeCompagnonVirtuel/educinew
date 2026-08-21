'use client';

import { useState, useCallback } from 'react';
import { EduOSNoCodeWorkflowService } from '../services/eduos-no-code-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { NoCodeWorkflow } from '@educi/types';

export const useEduOSNoCodeWorkflowActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: NoCodeWorkflow): Promise<NoCodeWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeWorkflowService(supabase);
      return await service.createNoCodeWorkflow(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NoCodeWorkflow>): Promise<NoCodeWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeWorkflowService(supabase);
      return await service.updateNoCodeWorkflow(schoolId, id, data);
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
      const service = new EduOSNoCodeWorkflowService(supabase);
      await service.deleteNoCodeWorkflow(schoolId, id);
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