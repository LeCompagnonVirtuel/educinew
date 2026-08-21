'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDigitalProductService } from '../services/eduos-digital-product.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalProduct } from '@educi/types';

export const useEduOSDigitalProductList = (schoolId: string) => {
  const [items, setItems] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalProductService(supabase);
      const data = await service.listDigitalProducts(schoolId);
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
