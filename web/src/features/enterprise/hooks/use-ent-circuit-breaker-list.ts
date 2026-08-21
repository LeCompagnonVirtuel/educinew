'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCircuitBreakerService } from '../services/circuit-breaker.service';
import { createClient } from '@/lib/supabase/client';
import type { CircuitBreaker } from '@educi/types';

export const useEntCircuitBreakerList = (schoolId: string) => {
  const [items, setItems] = useState<CircuitBreaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCircuitBreakerService(supabase);
      const data = await service.listCircuitBreakers(schoolId);
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
