'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTracingConfigService } from '../services/tracing-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TracingConfig } from '@educi/types';

export const useEntTracingConfigList = (schoolId: string) => {
  const [items, setItems] = useState<TracingConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTracingConfigService(supabase);
      const data = await service.listTracingConfigs(schoolId);
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
