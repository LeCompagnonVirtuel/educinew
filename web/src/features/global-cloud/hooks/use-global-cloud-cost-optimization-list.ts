'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCostOptimizationService } from '../services/global-cloud-cost-optimization.service';
import { createClient } from '@/lib/supabase/client';
import type { CostOptimization } from '@educi/types';

export const useGlobalCloudCostOptimizationList = (schoolId: string) => {
  const [items, setItems] = useState<CostOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCostOptimizationService(supabase);
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