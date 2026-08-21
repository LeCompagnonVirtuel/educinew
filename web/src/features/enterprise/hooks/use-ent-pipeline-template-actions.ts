'use client';

import { useState, useCallback } from 'react';
import { EntPipelineTemplateService } from '../services/pipeline-template.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineTemplate, PipelineTemplateCreate } from '@educi/types';

export const useEntPipelineTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineTemplateCreate): Promise<PipelineTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTemplateService(supabase);
      return await service.createPipelineTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineTemplateCreate>): Promise<PipelineTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTemplateService(supabase);
      return await service.updatePipelineTemplate(schoolId, id, data);
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
      const service = new EntPipelineTemplateService(supabase);
      await service.deletePipelineTemplate(schoolId, id);
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
