'use client';

import { useState, useCallback } from 'react';
import { EntPipelineSecretService } from '../services/pipeline-secret.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineSecret, PipelineSecretCreate } from '@educi/types';

export const useEntPipelineSecretActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineSecretCreate): Promise<PipelineSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineSecretService(supabase);
      return await service.createPipelineSecret(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineSecretCreate>): Promise<PipelineSecret | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineSecretService(supabase);
      return await service.updatePipelineSecret(schoolId, id, data);
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
      const service = new EntPipelineSecretService(supabase);
      await service.deletePipelineSecret(schoolId, id);
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
