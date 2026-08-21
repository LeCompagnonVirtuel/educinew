'use client';

import { useState, useCallback } from 'react';
import { EduOSProductReviewService } from '../services/eduos-product-review.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductReview } from '@educi/types';

export const useEduOSProductReviewActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProductReview>): Promise<ProductReview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductReviewService(supabase);
      return await service.createProductReview(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProductReview>): Promise<ProductReview | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductReviewService(supabase);
      return await service.updateProductReview(schoolId, id, data);
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
      const service = new EduOSProductReviewService(supabase);
      await service.deleteProductReview(schoolId, id);
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
