'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProxyConfigService } from '../services/proxy-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ProxyConfig } from '@educi/types';

export const useEntProxyConfigList = (schoolId: string) => {
  const [items, setItems] = useState<ProxyConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProxyConfigService(supabase);
      const data = await service.listProxyConfigs(schoolId);
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
