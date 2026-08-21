'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantConfigurationService } from '../services/tenant-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantConfiguration } from '@educi/types';

export const useEntTenantConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<TenantConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantConfigurationService(supabase);
      const data = await service.listTenantConfigurations(schoolId);
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
