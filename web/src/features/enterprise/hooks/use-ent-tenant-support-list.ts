'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantSupportService } from '../services/tenant-support.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantSupport } from '@educi/types';

export const useEntTenantSupportList = (schoolId: string) => {
  const [items, setItems] = useState<TenantSupport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantSupportService(supabase);
      const data = await service.listTenantSupports(schoolId);
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
