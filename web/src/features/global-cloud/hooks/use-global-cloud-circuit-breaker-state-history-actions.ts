'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudCircuitBreakerStateHistoryService } from '../services/global-cloud-circuit-breaker-state-history.service';
import { createClient } from '@/lib/supabase/client';
import type { CircuitBreakerStateHistory } from '@educi/types';

export const useGlobalCloudCircuitBreakerStateHistoryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CircuitBreakerStateHistory>): Promise<CircuitBreakerStateHistory | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCircuitBreakerStateHistoryService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CircuitBreakerStateHistory>): Promise<CircuitBreakerStateHistory | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCircuitBreakerStateHistoryService(supabase);
      return await service.update(schoolId, id, data as any);
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
      const service = new GlobalCloudCircuitBreakerStateHistoryService(supabase);
      await service.delete(schoolId, id);
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