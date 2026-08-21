'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudTenantConfigService } from '../services/global-cloud-tenant-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantConfig } from '@educi/types';

export const useGlobalCloudTenantConfigList = (schoolId: string) => {
  const [items, setItems] = useState<TenantConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTenantConfigService(supabase);
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