'use client';

import { useState, useCallback } from 'react';
import { EntObservabilityStackService } from '../services/observability-stack.service';
import { createClient } from '@/lib/supabase/client';
import type { ObservabilityStack, ObservabilityStackCreate } from '@educi/types';

export const useEntObservabilityStackActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ObservabilityStackCreate): Promise<ObservabilityStack | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntObservabilityStackService(supabase);
      return await service.createObservabilityStack(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ObservabilityStackCreate>): Promise<ObservabilityStack | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntObservabilityStackService(supabase);
      return await service.updateObservabilityStack(schoolId, id, data);
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
      const service = new EntObservabilityStackService(supabase);
      await service.deleteObservabilityStack(schoolId, id);
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
