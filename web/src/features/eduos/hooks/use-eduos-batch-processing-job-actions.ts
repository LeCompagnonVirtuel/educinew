'use client';

import { useState, useCallback } from 'react';
import { EduOSBatchProcessingJobService } from '../services/eduos-batch-processing-job.service';
import { createClient } from '@/lib/supabase/client';
import type { BatchProcessingJob } from '@educi/types';

export const useEduOSBatchProcessingJobActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: BatchProcessingJob): Promise<BatchProcessingJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBatchProcessingJobService(supabase);
      return await service.createBatchProcessingJob(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BatchProcessingJob>): Promise<BatchProcessingJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBatchProcessingJobService(supabase);
      return await service.updateBatchProcessingJob(schoolId, id, data);
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
      const service = new EduOSBatchProcessingJobService(supabase);
      await service.deleteBatchProcessingJob(schoolId, id);
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