'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataMigrationJobService } from '../services/eduos-data-migration-job.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMigrationJob } from '@educi/types';

export const useEduOSDataMigrationJobList = (schoolId: string) => {
  const [items, setItems] = useState<DataMigrationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataMigrationJobService(supabase);
      const data = await service.listDataMigrationJobs(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};