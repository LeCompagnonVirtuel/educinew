'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningPlanService } from '../services/provisioning-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningPlan } from '@educi/types';

export const useEntProvisioningPlanList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningPlanService(supabase);
      const data = await service.listProvisioningPlans(schoolId);
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
