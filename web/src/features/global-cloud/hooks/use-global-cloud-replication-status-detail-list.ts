'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudReplicationStatusDetailService } from '../services/global-cloud-replication-status-detail.service';
import { createClient } from '@/lib/supabase/client';
import type { ReplicationStatusDetail } from '@educi/types';

export const useGlobalCloudReplicationStatusDetailList = (schoolId: string) => {
  const [items, setItems] = useState<ReplicationStatusDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudReplicationStatusDetailService(supabase);
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