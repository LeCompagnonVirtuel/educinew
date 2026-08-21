'use client';

import { useState, useCallback } from 'react';
import { EduOSIntegrationWebhookService } from '../services/eduos-integration-webhook.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationWebhook } from '@educi/types';

export const useEduOSIntegrationWebhookActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntegrationWebhook): Promise<IntegrationWebhook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationWebhookService(supabase);
      return await service.createIntegrationWebhook(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntegrationWebhook>): Promise<IntegrationWebhook | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationWebhookService(supabase);
      return await service.updateIntegrationWebhook(schoolId, id, data);
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
      const service = new EduOSIntegrationWebhookService(supabase);
      await service.deleteIntegrationWebhook(schoolId, id);
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