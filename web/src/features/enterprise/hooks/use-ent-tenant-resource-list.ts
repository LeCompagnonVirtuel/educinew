'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantResourceService } from '../services/tenant-resource.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantResource } from '@educi/types';

export const useEntTenantResourceList = (schoolId: string) => {
  const [items, setItems] = useState<TenantResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantResourceService(supabase);
      const data = await service.listTenantResources(schoolId);
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
