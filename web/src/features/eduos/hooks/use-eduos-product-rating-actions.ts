'use client';

import { useState, useCallback } from 'react';
import { EduOSProductRatingService } from '../services/eduos-product-rating.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductRating } from '@educi/types';

export const useEduOSProductRatingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProductRating>): Promise<ProductRating | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductRatingService(supabase);
      return await service.createProductRating(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProductRating>): Promise<ProductRating | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductRatingService(supabase);
      return await service.updateProductRating(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductRatingService(supabase);
      await service.deleteProductRating(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
