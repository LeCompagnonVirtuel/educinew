'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDeploymentRunService } from '../services/global-cloud-deployment-run.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentRun } from '@educi/types';

export const useGlobalCloudDeploymentRunList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDeploymentRunService(supabase);
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