'use client';

import { useState, useCallback } from 'react';
import { EntFailoverPrimaryService } from '../services/failover-primary.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverPrimary, FailoverPrimaryCreate } from '@educi/types';

export const useEntFailoverPrimaryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverPrimaryCreate): Promise<FailoverPrimary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverPrimaryService(supabase);
      return await service.createFailoverPrimary(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverPrimaryCreate>): Promise<FailoverPrimary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverPrimaryService(supabase);
      return await service.updateFailoverPrimary(schoolId, id, data);
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
      const service = new EntFailoverPrimaryService(supabase);
      await service.deleteFailoverPrimary(schoolId, id);
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
