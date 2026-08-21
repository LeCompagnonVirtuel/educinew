'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantRecoveryService } from '../services/tenant-recovery.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantRecovery } from '@educi/types';

export const useEntTenantRecoveryList = (schoolId: string) => {
  const [items, setItems] = useState<TenantRecovery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantRecoveryService(supabase);
      const data = await service.listTenantRecoverys(schoolId);
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
