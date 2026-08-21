'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntWebhookConfigService } from '../services/webhook-config.service';
import { createClient } from '@/lib/supabase/client';
import type { WebhookConfig } from '@educi/types';

export const useEntWebhookConfigList = (schoolId: string) => {
  const [items, setItems] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWebhookConfigService(supabase);
      const data = await service.listWebhookConfigs(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
