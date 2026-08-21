'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTimeoutConfigService } from '../services/timeout-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TimeoutConfig } from '@educi/types';

export const useEntTimeoutConfigList = (schoolId: string) => {
  const [items, setItems] = useState<TimeoutConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTimeoutConfigService(supabase);
      const data = await service.listTimeoutConfigs(schoolId);
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
