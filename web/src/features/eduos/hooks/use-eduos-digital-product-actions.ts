'use client';

import { useState, useCallback } from 'react';
import { EduOSDigitalProductService } from '../services/eduos-digital-product.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalProduct } from '@educi/types';

export const useEduOSDigitalProductActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DigitalProduct>): Promise<DigitalProduct | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalProductService(supabase);
      return await service.createDigitalProduct(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DigitalProduct>): Promise<DigitalProduct | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalProductService(supabase);
      return await service.updateDigitalProduct(schoolId, id, data);
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
      const service = new EduOSDigitalProductService(supabase);
      await service.deleteDigitalProduct(schoolId, id);
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
