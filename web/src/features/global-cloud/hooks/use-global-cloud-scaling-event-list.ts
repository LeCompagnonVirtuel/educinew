'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudScalingEventService } from '../services/global-cloud-scaling-event.service';
import { createClient } from '@/lib/supabase/client';
import type { ScalingEvent } from '@educi/types';

export const useGlobalCloudScalingEventList = (schoolId: string) => {
  const [items, setItems] = useState<ScalingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudScalingEventService(supabase);
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