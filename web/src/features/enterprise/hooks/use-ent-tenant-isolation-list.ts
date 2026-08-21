'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantIsolationService } from '../services/tenant-isolation.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantIsolation } from '@educi/types';

export const useEntTenantIsolationList = (schoolId: string) => {
  const [items, setItems] = useState<TenantIsolation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantIsolationService(supabase);
      const data = await service.listTenantIsolations(schoolId);
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
