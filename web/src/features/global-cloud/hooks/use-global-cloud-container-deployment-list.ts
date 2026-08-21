'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudContainerDeploymentService } from '../services/global-cloud-container-deployment.service';
import { createClient } from '@/lib/supabase/client';
import type { ContainerDeployment } from '@educi/types';

export const useGlobalCloudContainerDeploymentList = (schoolId: string) => {
  const [items, setItems] = useState<ContainerDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudContainerDeploymentService(supabase);
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