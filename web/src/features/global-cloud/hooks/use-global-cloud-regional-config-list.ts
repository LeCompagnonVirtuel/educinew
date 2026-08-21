'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudRegionalConfigService } from '../services/global-cloud-regional-config.service';
import { createClient } from '@/lib/supabase/client';
import type { RegionalConfig } from '@educi/types';

export const useGlobalCloudRegionalConfigList = (schoolId: string) => {
  const [items, setItems] = useState<RegionalConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudRegionalConfigService(supabase);
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