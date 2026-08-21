'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCircuitBreakerStateHistoryService } from '../services/global-cloud-circuit-breaker-state-history.service';
import { createClient } from '@/lib/supabase/client';
import type { CircuitBreakerStateHistory } from '@educi/types';

export const useGlobalCloudCircuitBreakerStateHistoryList = (schoolId: string) => {
  const [items, setItems] = useState<CircuitBreakerStateHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCircuitBreakerStateHistoryService(supabase);
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