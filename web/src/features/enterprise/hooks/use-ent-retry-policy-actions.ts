'use client';

import { useState, useCallback } from 'react';
import { EntRetryPolicyService } from '../services/retry-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { RetryPolicy, RetryPolicyCreate } from '@educi/types';

export const useEntRetryPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RetryPolicyCreate): Promise<RetryPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRetryPolicyService(supabase);
      return await service.createRetryPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RetryPolicyCreate>): Promise<RetryPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRetryPolicyService(supabase);
      return await service.updateRetryPolicy(schoolId, id, data);
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
      const service = new EntRetryPolicyService(supabase);
      await service.deleteRetryPolicy(schoolId, id);
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
