'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudSSLService } from '../services/global-cloud-cloud-ssl.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudSSL } from '@educi/types';

export const useGlobalCloudCloudSSLList = (schoolId: string) => {
  const [items, setItems] = useState<CloudSSL[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudSSLService(supabase);
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