'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCapacityPlanService } from '../services/global-cloud-capacity-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { CapacityPlan } from '@educi/types';

export const useGlobalCloudCapacityPlanList = (schoolId: string) => {
  const [items, setItems] = useState<CapacityPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCapacityPlanService(supabase);
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