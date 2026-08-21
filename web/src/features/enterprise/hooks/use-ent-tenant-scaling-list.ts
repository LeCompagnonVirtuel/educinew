'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantScalingService } from '../services/tenant-scaling.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantScaling } from '@educi/types';

export const useEntTenantScalingList = (schoolId: string) => {
  const [items, setItems] = useState<TenantScaling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantScalingService(supabase);
      const data = await service.listTenantScalings(schoolId);
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
