'use client';

import { useState, useCallback } from 'react';
import { EntCircuitBreakerService } from '../services/circuit-breaker.service';
import { createClient } from '@/lib/supabase/client';
import type { CircuitBreaker, CircuitBreakerCreate } from '@educi/types';

export const useEntCircuitBreakerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CircuitBreakerCreate): Promise<CircuitBreaker | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCircuitBreakerService(supabase);
      return await service.createCircuitBreaker(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CircuitBreakerCreate>): Promise<CircuitBreaker | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCircuitBreakerService(supabase);
      return await service.updateCircuitBreaker(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCircuitBreakerService(supabase);
      await service.deleteCircuitBreaker(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
