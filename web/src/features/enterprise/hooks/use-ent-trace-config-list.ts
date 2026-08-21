'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTraceConfigService } from '../services/trace-config.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceConfig } from '@educi/types';

export const useEntTraceConfigList = (schoolId: string) => {
  const [items, setItems] = useState<TraceConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceConfigService(supabase);
      const data = await service.listTraceConfigs(schoolId);
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
