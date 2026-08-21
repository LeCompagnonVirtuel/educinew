'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformGrowthService } from '../services/platform-growth.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformGrowth } from '@educi/types';

export const useEntPlatformGrowthList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformGrowth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformGrowthService(supabase);
      const data = await service.listPlatformGrowths(schoolId);
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
