'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMeshTrafficService } from '../services/global-cloud-mesh-traffic.service';
import { createClient } from '@/lib/supabase/client';
import type { MeshTraffic } from '@educi/types';

export const useGlobalCloudMeshTrafficList = (schoolId: string) => {
  const [items, setItems] = useState<MeshTraffic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMeshTrafficService(supabase);
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