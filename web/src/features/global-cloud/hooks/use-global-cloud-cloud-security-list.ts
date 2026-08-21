'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudSecurityService } from '../services/global-cloud-cloud-security.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudSecurity } from '@educi/types';

export const useGlobalCloudCloudSecurityList = (schoolId: string) => {
  const [items, setItems] = useState<CloudSecurity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudSecurityService(supabase);
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