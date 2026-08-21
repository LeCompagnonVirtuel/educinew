'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFederationSyncService } from '../services/global-cloud-federation-sync.service';
import { createClient } from '@/lib/supabase/client';
import type { FederationSync } from '@educi/types';

export const useGlobalCloudFederationSyncList = (schoolId: string) => {
  const [items, setItems] = useState<FederationSync[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFederationSyncService(supabase);
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