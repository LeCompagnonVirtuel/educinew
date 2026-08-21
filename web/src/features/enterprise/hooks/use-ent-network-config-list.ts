'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntNetworkConfigService } from '../services/network-config.service';
import { createClient } from '@/lib/supabase/client';
import type { NetworkConfig } from '@educi/types';

export const useEntNetworkConfigList = (schoolId: string) => {
  const [items, setItems] = useState<NetworkConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNetworkConfigService(supabase);
      const data = await service.listNetworkConfigs(schoolId);
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
