'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDeploymentPlanService } from '../services/global-cloud-deployment-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentPlan } from '@educi/types';

export const useGlobalCloudDeploymentPlanList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDeploymentPlanService(supabase);
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