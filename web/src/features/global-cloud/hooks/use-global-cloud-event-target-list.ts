'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEventTargetService } from '../services/global-cloud-event-target.service';
import { createClient } from '@/lib/supabase/client';
import type { EventTarget } from '@educi/types';

export const useGlobalCloudEventTargetList = (schoolId: string) => {
  const [items, setItems] = useState<EventTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEventTargetService(supabase);
      const data = await service.list(schoolId);
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