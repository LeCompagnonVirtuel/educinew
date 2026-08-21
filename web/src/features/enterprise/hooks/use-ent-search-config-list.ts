'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchConfigService } from '../services/search-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchConfig } from '@educi/types';

export const useEntSearchConfigList = (schoolId: string) => {
  const [items, setItems] = useState<SearchConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchConfigService(supabase);
      const data = await service.listSearchConfigs(schoolId);
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
