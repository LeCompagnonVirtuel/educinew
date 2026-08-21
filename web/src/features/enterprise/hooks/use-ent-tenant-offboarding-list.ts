'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantOffboardingService } from '../services/tenant-offboarding.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOffboarding } from '@educi/types';

export const useEntTenantOffboardingList = (schoolId: string) => {
  const [items, setItems] = useState<TenantOffboarding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOffboardingService(supabase);
      const data = await service.listTenantOffboardings(schoolId);
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
