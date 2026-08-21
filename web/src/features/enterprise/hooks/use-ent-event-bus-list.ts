'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntEventBusService } from '../services/event-bus.service';
import { createClient } from '@/lib/supabase/client';
import type { EventBus } from '@educi/types';

export const useEntEventBusList = (schoolId: string) => {
  const [items, setItems] = useState<EventBus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEventBusService(supabase);
      const data = await service.listEventBuss(schoolId);
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
