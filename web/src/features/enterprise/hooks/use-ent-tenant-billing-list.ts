'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantBillingService } from '../services/tenant-billing.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantBilling } from '@educi/types';

export const useEntTenantBillingList = (schoolId: string) => {
  const [items, setItems] = useState<TenantBilling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBillingService(supabase);
      const data = await service.listTenantBillings(schoolId);
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
