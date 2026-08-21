'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCostAlertService } from '../services/global-cloud-cost-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { CostAlert } from '@educi/types';

export const useGlobalCloudCostAlertList = (schoolId: string) => {
  const [items, setItems] = useState<CostAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCostAlertService(supabase);
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