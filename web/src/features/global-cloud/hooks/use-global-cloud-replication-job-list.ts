'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudReplicationJobService } from '../services/global-cloud-replication-job.service';
import { createClient } from '@/lib/supabase/client';
import type { ReplicationJob } from '@educi/types';

export const useGlobalCloudReplicationJobList = (schoolId: string) => {
  const [items, setItems] = useState<ReplicationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudReplicationJobService(supabase);
      const data = await service.list(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};