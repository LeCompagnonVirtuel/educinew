'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantSecurityService } from '../services/tenant-security.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantSecurity } from '@educi/types';

export const useEntTenantSecurityList = (schoolId: string) => {
  const [items, setItems] = useState<TenantSecurity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantSecurityService(supabase);
      const data = await service.listTenantSecuritys(schoolId);
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
