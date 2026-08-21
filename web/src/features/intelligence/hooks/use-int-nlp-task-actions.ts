'use client';

import { useState, useCallback } from 'react';
import { IntNlpTaskService } from '../services/int-nlp-task.service';
import { createClient } from '@/lib/supabase/client';
import type { NLPTask, NLPTaskCreate } from '@educi/types';

export const useIntNlpTaskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: NLPTaskCreate): Promise<NLPTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntNlpTaskService(supabase);
      return await service.createNLPTask(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NLPTaskCreate>): Promise<NLPTask | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntNlpTaskService(supabase);
      return await service.updateNLPTask(schoolId, id, data);
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
      const service = new IntNlpTaskService(supabase);
      await service.deleteNLPTask(schoolId, id);
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