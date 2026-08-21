'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertChannelService } from '../services/alert-channel.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertChannel } from '@educi/types';

export const useEntAlertChannelList = (schoolId: string) => {
  const [items, setItems] = useState<AlertChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertChannelService(supabase);
      const data = await service.listAlertChannels(schoolId);
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
