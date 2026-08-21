'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEdgeDeploymentService } from '../services/global-cloud-edge-deployment.service';
import { createClient } from '@/lib/supabase/client';
import type { EdgeDeployment } from '@educi/types';

export const useGlobalCloudEdgeDeploymentList = (schoolId: string) => {
  const [items, setItems] = useState<EdgeDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEdgeDeploymentService(supabase);
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