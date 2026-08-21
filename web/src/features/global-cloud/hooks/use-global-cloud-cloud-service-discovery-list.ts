'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudServiceDiscoveryService } from '../services/global-cloud-cloud-service-discovery.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudServiceDiscovery } from '@educi/types';

export const useGlobalCloudCloudServiceDiscoveryList = (schoolId: string) => {
  const [items, setItems] = useState<CloudServiceDiscovery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudServiceDiscoveryService(supabase);
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