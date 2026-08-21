'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantLimitService } from '../services/tenant-limit.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantLimit } from '@educi/types';

export const useEntTenantLimitList = (schoolId: string) => {
  const [items, setItems] = useState<TenantLimit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantLimitService(supabase);
      const data = await service.listTenantLimits(schoolId);
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
