'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudTenantFederationService } from '../services/global-cloud-tenant-federation.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantFederation } from '@educi/types';

export const useGlobalCloudTenantFederationList = (schoolId: string) => {
  const [items, setItems] = useState<TenantFederation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudTenantFederationService(supabase);
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