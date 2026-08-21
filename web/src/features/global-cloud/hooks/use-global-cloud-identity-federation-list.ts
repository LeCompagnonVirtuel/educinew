'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudIdentityFederationService } from '../services/global-cloud-identity-federation.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityFederation } from '@educi/types';

export const useGlobalCloudIdentityFederationList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityFederation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudIdentityFederationService(supabase);
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