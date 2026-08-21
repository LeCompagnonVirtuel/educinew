'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPerformanceConfigService } from '../services/performance-config.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceConfig } from '@educi/types';

export const useEntPerformanceConfigList = (schoolId: string) => {
  const [items, setItems] = useState<PerformanceConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceConfigService(supabase);
      const data = await service.listPerformanceConfigs(schoolId);
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
