'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMessagingIntegrationService } from '../services/eduos-messaging-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { MessagingIntegration } from '@educi/types';

export const useEduOSMessagingIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<MessagingIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMessagingIntegrationService(supabase);
      const data = await service.listMessagingIntegrations(schoolId);
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