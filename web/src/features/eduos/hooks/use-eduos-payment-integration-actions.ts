'use client';

import { useState, useCallback } from 'react';
import { EduOSPaymentIntegrationService } from '../services/eduos-payment-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { PaymentIntegration } from '@educi/types';

export const useEduOSPaymentIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PaymentIntegration): Promise<PaymentIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentIntegrationService(supabase);
      return await service.createPaymentIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PaymentIntegration>): Promise<PaymentIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPaymentIntegrationService(supabase);
      return await service.updatePaymentIntegration(schoolId, id, data);
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
      const service = new EduOSPaymentIntegrationService(supabase);
      await service.deletePaymentIntegration(schoolId, id);
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