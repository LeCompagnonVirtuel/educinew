'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudServiceInstanceService } from '../services/global-cloud-service-instance.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceInstance } from '@educi/types';

export const useGlobalCloudServiceInstanceList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudServiceInstanceService(supabase);
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