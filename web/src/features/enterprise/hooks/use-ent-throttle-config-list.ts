'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntThrottleConfigService } from '../services/throttle-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ThrottleConfig } from '@educi/types';

export const useEntThrottleConfigList = (schoolId: string) => {
  const [items, setItems] = useState<ThrottleConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntThrottleConfigService(supabase);
      const data = await service.listThrottleConfigs(schoolId);
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
