'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataProductService } from '../services/eduos-data-product.service';
import { createClient } from '@/lib/supabase/client';
import type { DataProduct } from '@educi/types';

export const useEduOSDataProductList = (schoolId: string) => {
  const [items, setItems] = useState<DataProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataProductService(supabase);
      const data = await service.listDataProducts(schoolId);
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