'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceExtensionService } from '../services/eduos-marketplace-extension.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceExtension } from '@educi/types';

export const useEduOSMarketplaceExtensionList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceExtension[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceExtensionService(supabase);
      const data = await service.listMarketplaceExtensions(schoolId);
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
