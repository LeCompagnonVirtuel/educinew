'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSDKConfigService } from '../services/sdk-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKConfig } from '@educi/types';

export const useEntSDKConfigList = (schoolId: string) => {
  const [items, setItems] = useState<SDKConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKConfigService(supabase);
      const data = await service.listSDKConfigs(schoolId);
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
