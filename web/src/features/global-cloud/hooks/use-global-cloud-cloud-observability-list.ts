'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudObservabilityService } from '../services/global-cloud-cloud-observability.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudObservability } from '@educi/types';

export const useGlobalCloudCloudObservabilityList = (schoolId: string) => {
  const [items, setItems] = useState<CloudObservability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudObservabilityService(supabase);
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