'use client';

import { useState, useCallback } from 'react';
import { EntPipelineApprovalService } from '../services/pipeline-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineApproval, PipelineApprovalCreate } from '@educi/types';

export const useEntPipelineApprovalActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineApprovalCreate): Promise<PipelineApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineApprovalService(supabase);
      return await service.createPipelineApproval(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineApprovalCreate>): Promise<PipelineApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineApprovalService(supabase);
      return await service.updatePipelineApproval(schoolId, id, data);
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
      const service = new EntPipelineApprovalService(supabase);
      await service.deletePipelineApproval(schoolId, id);
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
