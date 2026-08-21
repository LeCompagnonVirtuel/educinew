'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverConfigService } from '../services/failover-config.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverConfig } from '@educi/types';

export const useEntFailoverConfigList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverConfigService(supabase);
      const data = await service.listFailoverConfigs(schoolId);
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
