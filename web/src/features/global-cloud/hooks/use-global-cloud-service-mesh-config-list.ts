'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudServiceMeshConfigService } from '../services/global-cloud-service-mesh-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceMeshConfig } from '@educi/types';

export const useGlobalCloudServiceMeshConfigList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceMeshConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudServiceMeshConfigService(supabase);
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