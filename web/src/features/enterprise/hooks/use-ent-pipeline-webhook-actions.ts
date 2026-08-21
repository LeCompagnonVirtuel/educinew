'use client';

import { useState, useCallback } from 'react';
import { EntPipelineWebhookService } from '../services/pipeline-webhook.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineWebhook, PipelineWebhookCreate } from '@educi/types';

export const useEntPipelineWebhookActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineWebhookCreate): Promise<PipelineWebhook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineWebhookService(supabase);
      return await service.createPipelineWebhook(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineWebhookCreate>): Promise<PipelineWebhook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineWebhookService(supabase);
      return await service.updatePipelineWebhook(schoolId, id, data);
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
      const service = new EntPipelineWebhookService(supabase);
      await service.deletePipelineWebhook(schoolId, id);
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
