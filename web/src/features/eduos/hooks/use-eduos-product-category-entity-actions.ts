'use client';

import { useState, useCallback } from 'react';
import { EduOSProductCategoryEntityService } from '../services/eduos-product-category-entity.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductCategoryEntity } from '@educi/types';

export const useEduOSProductCategoryEntityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductCategoryEntityService(supabase);
      return await service.createProductCategoryEntity(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductCategoryEntityService(supabase);
      return await service.updateProductCategoryEntity(schoolId, id, data);
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
      const service = new EduOSProductCategoryEntityService(supabase);
      await service.deleteProductCategoryEntity(schoolId, id);
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
