'use client';

import { useState, useCallback } from 'react';
import { EntPipelineTriggerService } from '../services/pipeline-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineTrigger, PipelineTriggerCreate } from '@educi/types';

export const useEntPipelineTriggerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineTriggerCreate): Promise<PipelineTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTriggerService(supabase);
      return await service.createPipelineTrigger(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineTriggerCreate>): Promise<PipelineTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTriggerService(supabase);
      return await service.updatePipelineTrigger(schoolId, id, data);
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
      const service = new EntPipelineTriggerService(supabase);
      await service.deletePipelineTrigger(schoolId, id);
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
