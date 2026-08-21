'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertReceiverService } from '../services/alert-receiver.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertReceiver } from '@educi/types';

export const useEntAlertReceiverList = (schoolId: string) => {
  const [items, setItems] = useState<AlertReceiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertReceiverService(supabase);
      const data = await service.listAlertReceivers(schoolId);
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
