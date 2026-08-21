'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSProductRatingService } from '../services/eduos-product-rating.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductRating } from '@educi/types';

export const useEduOSProductRatingList = (schoolId: string) => {
  const [items, setItems] = useState<ProductRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductRatingService(supabase);
      const data = await service.listProductRatings(schoolId);
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
