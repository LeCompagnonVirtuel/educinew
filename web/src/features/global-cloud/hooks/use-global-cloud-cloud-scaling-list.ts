'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudScalingService } from '../services/global-cloud-cloud-scaling.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudScaling } from '@educi/types';

export const useGlobalCloudCloudScalingList = (schoolId: string) => {
  const [items, setItems] = useState<CloudScaling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudScalingService(supabase);
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