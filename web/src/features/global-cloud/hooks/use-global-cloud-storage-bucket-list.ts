'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudStorageBucketService } from '../services/global-cloud-storage-bucket.service';
import { createClient } from '@/lib/supabase/client';
import type { StorageBucket } from '@educi/types';

export const useGlobalCloudStorageBucketList = (schoolId: string) => {
  const [items, setItems] = useState<StorageBucket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudStorageBucketService(supabase);
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