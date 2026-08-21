'use client';

import { useState, useCallback } from 'react';
import { EduOSDataMigrationJobService } from '../services/eduos-data-migration-job.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMigrationJob } from '@educi/types';

export const useEduOSDataMigrationJobActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataMigrationJob): Promise<DataMigrationJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataMigrationJobService(supabase);
      return await service.createDataMigrationJob(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataMigrationJob>): Promise<DataMigrationJob | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataMigrationJobService(supabase);
      return await service.updateDataMigrationJob(schoolId, id, data);
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
      const service = new EduOSDataMigrationJobService(supabase);
      await service.deleteDataMigrationJob(schoolId, id);
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