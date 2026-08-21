'use client';

import { useState, useCallback } from 'react';
import { EduOSJobRunnerService } from '../services/eduos-job-runner.service';
import { createClient } from '@/lib/supabase/client';
import type { JobRunner } from '@educi/types';

export const useEduOSJobRunnerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<JobRunner>): Promise<JobRunner | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSJobRunnerService(supabase);
      return await service.createJobRunner(schoolId, data as JobRunner);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<JobRunner>): Promise<JobRunner | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSJobRunnerService(supabase);
      return await service.updateJobRunner(schoolId, id, data);
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
      const service = new EduOSJobRunnerService(supabase);
      await service.deleteJobRunner(schoolId, id);
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
