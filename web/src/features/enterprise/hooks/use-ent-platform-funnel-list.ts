'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformFunnelService } from '../services/platform-funnel.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformFunnel } from '@educi/types';

export const useEntPlatformFunnelList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformFunnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformFunnelService(supabase);
      const data = await service.listPlatformFunnels(schoolId);
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
