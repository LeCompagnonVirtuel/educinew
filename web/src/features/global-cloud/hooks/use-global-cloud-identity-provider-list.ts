'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudIdentityProviderService } from '../services/global-cloud-identity-provider.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityProvider } from '@educi/types';

export const useGlobalCloudIdentityProviderList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudIdentityProviderService(supabase);
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