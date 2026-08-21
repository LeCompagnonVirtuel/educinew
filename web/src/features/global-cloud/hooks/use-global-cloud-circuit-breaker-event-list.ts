'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCircuitBreakerEventService } from '../services/global-cloud-circuit-breaker-event.service';
import { createClient } from '@/lib/supabase/client';
import type { CircuitBreakerEvent } from '@educi/types';

export const useGlobalCloudCircuitBreakerEventList = (schoolId: string) => {
  const [items, setItems] = useState<CircuitBreakerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCircuitBreakerEventService(supabase);
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