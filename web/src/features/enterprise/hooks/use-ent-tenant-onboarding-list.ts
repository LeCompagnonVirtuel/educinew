'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantOnboardingService } from '../services/tenant-onboarding.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantOnboarding } from '@educi/types';

export const useEntTenantOnboardingList = (schoolId: string) => {
  const [items, setItems] = useState<TenantOnboarding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantOnboardingService(supabase);
      const data = await service.listTenantOnboardings(schoolId);
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
