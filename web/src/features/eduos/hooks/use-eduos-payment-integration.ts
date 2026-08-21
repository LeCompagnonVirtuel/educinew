'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSPaymentIntegrationService } from '../services/eduos-payment-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { PaymentIntegration } from '@educi/types';

export const useEduOSPaymentIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<PaymentIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentIntegrationService(supabase);
      const data = await service.listPaymentIntegrations(schoolId);
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