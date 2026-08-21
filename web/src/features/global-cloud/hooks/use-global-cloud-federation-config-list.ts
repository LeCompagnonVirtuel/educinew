'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFederationConfigService } from '../services/global-cloud-federation-config.service';
import { createClient } from '@/lib/supabase/client';
import type { FederationConfig } from '@educi/types';

export const useGlobalCloudFederationConfigList = (schoolId: string) => {
  const [items, setItems] = useState<FederationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFederationConfigService(supabase);
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