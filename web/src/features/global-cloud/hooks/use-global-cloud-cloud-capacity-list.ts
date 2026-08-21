'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudCapacityService } from '../services/global-cloud-cloud-capacity.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudCapacity } from '@educi/types';

export const useGlobalCloudCloudCapacityList = (schoolId: string) => {
  const [items, setItems] = useState<CloudCapacity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudCapacityService(supabase);
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