'use client';

import { useState, useCallback } from 'react';
import { EduOSLowCodeWorkflowService } from '../services/eduos-low-code-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { LowCodeWorkflow } from '@educi/types';

export const useEduOSLowCodeWorkflowActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LowCodeWorkflow): Promise<LowCodeWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLowCodeWorkflowService(supabase);
      return await service.createLowCodeWorkflow(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LowCodeWorkflow>): Promise<LowCodeWorkflow | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLowCodeWorkflowService(supabase);
      return await service.updateLowCodeWorkflow(schoolId, id, data);
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
      const service = new EduOSLowCodeWorkflowService(supabase);
      await service.deleteLowCodeWorkflow(schoolId, id);
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