'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIntegrationWebhookService } from '../services/eduos-integration-webhook.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationWebhook } from '@educi/types';

export const useEduOSIntegrationWebhookList = (schoolId: string) => {
  const [items, setItems] = useState<IntegrationWebhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationWebhookService(supabase);
      const data = await service.listIntegrationWebhooks(schoolId);
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