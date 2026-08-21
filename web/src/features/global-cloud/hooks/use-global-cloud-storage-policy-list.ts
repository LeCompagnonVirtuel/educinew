'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudStoragePolicyService } from '../services/global-cloud-storage-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { StoragePolicy } from '@educi/types';

export const useGlobalCloudStoragePolicyList = (schoolId: string) => {
  const [items, setItems] = useState<StoragePolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudStoragePolicyService(supabase);
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