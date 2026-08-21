'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudPluginConfigService } from '../services/global-cloud-plugin-config.service';
import { createClient } from '@/lib/supabase/client';
import type { PluginConfig } from '@educi/types';

export const useGlobalCloudPluginConfigList = (schoolId: string) => {
  const [items, setItems] = useState<PluginConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudPluginConfigService(supabase);
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