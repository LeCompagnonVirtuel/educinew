'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntNodeConfigService } from '../services/node-config.service';
import { createClient } from '@/lib/supabase/client';
import type { NodeConfig } from '@educi/types';

export const useEntNodeConfigList = (schoolId: string) => {
  const [items, setItems] = useState<NodeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntNodeConfigService(supabase);
      const data = await service.listNodeConfigs(schoolId);
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
