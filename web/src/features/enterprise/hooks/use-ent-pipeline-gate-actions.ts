'use client';

import { useState, useCallback } from 'react';
import { EntPipelineGateService } from '../services/pipeline-gate.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineGate, PipelineGateCreate } from '@educi/types';

export const useEntPipelineGateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineGateCreate): Promise<PipelineGate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineGateService(supabase);
      return await service.createPipelineGate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineGateCreate>): Promise<PipelineGate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineGateService(supabase);
      return await service.updatePipelineGate(schoolId, id, data);
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
      const service = new EntPipelineGateService(supabase);
      await service.deletePipelineGate(schoolId, id);
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
