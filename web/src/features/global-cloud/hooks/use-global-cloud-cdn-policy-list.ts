'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCDNPolicyService } from '../services/global-cloud-cdn-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { CDNPolicy } from '@educi/types';

export const useGlobalCloudCDNPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<CDNPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCDNPolicyService(supabase);
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