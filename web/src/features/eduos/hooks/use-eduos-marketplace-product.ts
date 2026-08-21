'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceProductService } from '../services/eduos-marketplace-product.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceProduct } from '@educi/types';

export const useEduOSMarketplaceProductList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceProductService(supabase);
      const data = await service.listMarketplaceProducts(schoolId);
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
