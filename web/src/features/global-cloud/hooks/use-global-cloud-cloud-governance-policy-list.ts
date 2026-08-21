'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudGovernancePolicyService } from '../services/global-cloud-cloud-governance-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernancePolicy } from '@educi/types';

export const useGlobalCloudCloudGovernancePolicyList = (schoolId: string) => {
  const [items, setItems] = useState<GovernancePolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudGovernancePolicyService(supabase);
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