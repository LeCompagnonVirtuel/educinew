'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDisasterRecoveryPlanService } from '../services/global-cloud-disaster-recovery-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { DisasterRecoveryPlan } from '@educi/types';

export const useGlobalCloudDisasterRecoveryPlanList = (schoolId: string) => {
  const [items, setItems] = useState<DisasterRecoveryPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDisasterRecoveryPlanService(supabase);
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