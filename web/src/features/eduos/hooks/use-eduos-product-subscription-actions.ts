'use client';

import { useState, useCallback } from 'react';
import { EduOSProductSubscriptionService } from '../services/eduos-product-subscription.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductSubscription } from '@educi/types';

export const useEduOSProductSubscriptionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProductSubscription>): Promise<ProductSubscription | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductSubscriptionService(supabase);
      return await service.createProductSubscription(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProductSubscription>): Promise<ProductSubscription | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductSubscriptionService(supabase);
      return await service.updateProductSubscription(schoolId, id, data);
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
      const service = new EduOSProductSubscriptionService(supabase);
      await service.deleteProductSubscription(schoolId, id);
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
