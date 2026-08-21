'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudRegionDeploymentService } from '../services/global-cloud-region-deployment.service';
import { createClient } from '@/lib/supabase/client';
import type { RegionDeployment } from '@educi/types';

export const useGlobalCloudRegionDeploymentList = (schoolId: string) => {
  const [items, setItems] = useState<RegionDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudRegionDeploymentService(supabase);
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