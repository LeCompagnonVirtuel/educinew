'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantUsageService } from '../services/tenant-usage.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantUsage } from '@educi/types';

export const useEntTenantUsageList = (schoolId: string) => {
  const [items, setItems] = useState<TenantUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantUsageService(supabase);
      const data = await service.listTenantUsages(schoolId);
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
