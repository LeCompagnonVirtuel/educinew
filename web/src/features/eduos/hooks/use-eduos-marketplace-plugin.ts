'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplacePluginService } from '../services/eduos-marketplace-plugin.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplacePlugin } from '@educi/types';

export const useEduOSMarketplacePluginList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplacePlugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplacePluginService(supabase);
      const data = await service.listMarketplacePlugins(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
