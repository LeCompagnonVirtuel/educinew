'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudDNSService } from '../services/global-cloud-cloud-dns.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudDNS } from '@educi/types';

export const useGlobalCloudCloudDNSList = (schoolId: string) => {
  const [items, setItems] = useState<CloudDNS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudDNSService(supabase);
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