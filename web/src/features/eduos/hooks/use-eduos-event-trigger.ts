'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSEventTriggerService } from '../services/eduos-event-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { EventTrigger } from '@educi/types';

export const useEduOSEventTriggerList = (schoolId: string) => {
  const [items, setItems] = useState<EventTrigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEventTriggerService(supabase);
      const data = await service.listEventTriggers(schoolId);
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