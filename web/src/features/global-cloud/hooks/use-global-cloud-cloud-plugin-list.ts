'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudPluginService } from '../services/global-cloud-cloud-plugin.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudPlugin } from '@educi/types';

export const useGlobalCloudCloudPluginList = (schoolId: string) => {
  const [items, setItems] = useState<CloudPlugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudPluginService(supabase);
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