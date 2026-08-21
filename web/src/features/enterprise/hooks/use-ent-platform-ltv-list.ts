'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformLTVService } from '../services/platform-ltv.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformLTV } from '@educi/types';

export const useEntPlatformLTVList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformLTV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformLTVService(supabase);
      const data = await service.listPlatformLTVs(schoolId);
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
