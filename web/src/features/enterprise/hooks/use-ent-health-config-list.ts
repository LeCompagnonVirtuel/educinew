'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthConfigService } from '../services/health-config.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthConfig } from '@educi/types';

export const useEntHealthConfigList = (schoolId: string) => {
  const [items, setItems] = useState<HealthConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthConfigService(supabase);
      const data = await service.listHealthConfigs(schoolId);
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
