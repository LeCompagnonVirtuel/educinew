'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSProductSubscriptionService } from '../services/eduos-product-subscription.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductSubscription } from '@educi/types';

export const useEduOSProductSubscriptionList = (schoolId: string) => {
  const [items, setItems] = useState<ProductSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductSubscriptionService(supabase);
      const data = await service.listProductSubscriptions(schoolId);
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
