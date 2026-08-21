'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSProductCategoryEntityService } from '../services/eduos-product-category-entity.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductCategoryEntity } from '@educi/types';

export const useEduOSProductCategoryEntityList = (schoolId: string) => {
  const [items, setItems] = useState<ProductCategoryEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductCategoryEntityService(supabase);
      const data = await service.listProductCategoryEntities(schoolId);
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
