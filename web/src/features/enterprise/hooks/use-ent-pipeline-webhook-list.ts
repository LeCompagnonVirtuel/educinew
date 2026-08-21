'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineWebhookService } from '../services/pipeline-webhook.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineWebhook } from '@educi/types';

export const useEntPipelineWebhookList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineWebhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineWebhookService(supabase);
      const data = await service.listPipelineWebhooks(schoolId);
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
