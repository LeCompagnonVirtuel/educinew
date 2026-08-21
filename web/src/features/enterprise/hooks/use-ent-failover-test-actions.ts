'use client';

import { useState, useCallback } from 'react';
import { EntFailoverTestService } from '../services/failover-test.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverTest, FailoverTestCreate } from '@educi/types';

export const useEntFailoverTestActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverTestCreate): Promise<FailoverTest | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverTestService(supabase);
      return await service.createFailoverTest(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverTestCreate>): Promise<FailoverTest | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverTestService(supabase);
      return await service.updateFailoverTest(schoolId, id, data);
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
      const service = new EntFailoverTestService(supabase);
      await service.deleteFailoverTest(schoolId, id);
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
