'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantOptimizationService } from '../services/tenant-optimization.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOptimization } from '@educi/types';

export const useEntTenantOptimizationList = (schoolId: string) => {
  const [items, setItems] = useState<TenantOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOptimizationService(supabase);
      const data = await service.listTenantOptimizations(schoolId);
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
