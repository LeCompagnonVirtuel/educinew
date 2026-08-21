'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudRegionConfigService } from '../services/global-cloud-region-config.service';
import { createClient } from '@/lib/supabase/client';
import type { RegionConfig } from '@educi/types';

export const useGlobalCloudRegionConfigList = (schoolId: string) => {
  const [items, setItems] = useState<RegionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudRegionConfigService(supabase);
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