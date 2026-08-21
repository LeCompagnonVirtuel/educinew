'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantProvisioningService } from '../services/tenant-provisioning.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantProvisioning } from '@educi/types';

export const useEntTenantProvisioningList = (schoolId: string) => {
  const [items, setItems] = useState<TenantProvisioning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantProvisioningService(supabase);
      const data = await service.listTenantProvisionings(schoolId);
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
