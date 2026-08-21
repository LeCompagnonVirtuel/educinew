'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMultiRegionService } from '../services/global-cloud-multi-region.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiRegion } from '@educi/types';

export const useGlobalCloudMultiRegionList = (schoolId: string) => {
  const [items, setItems] = useState<MultiRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMultiRegionService(supabase);
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