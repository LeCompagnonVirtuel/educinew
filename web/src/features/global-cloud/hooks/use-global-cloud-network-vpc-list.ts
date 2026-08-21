'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudNetworkVPCService } from '../services/global-cloud-network-vpc.service';
import { createClient } from '@/lib/supabase/client';
import type { NetworkVPC } from '@educi/types';

export const useGlobalCloudNetworkVPCList = (schoolId: string) => {
  const [items, setItems] = useState<NetworkVPC[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudNetworkVPCService(supabase);
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