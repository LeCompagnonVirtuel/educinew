'use client';

import { useState, useCallback } from 'react';
import { EntFailoverSecondaryService } from '../services/failover-secondary.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverSecondary, FailoverSecondaryCreate } from '@educi/types';

export const useEntFailoverSecondaryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverSecondaryCreate): Promise<FailoverSecondary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverSecondaryService(supabase);
      return await service.createFailoverSecondary(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverSecondaryCreate>): Promise<FailoverSecondary | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverSecondaryService(supabase);
      return await service.updateFailoverSecondary(schoolId, id, data);
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
      const service = new EntFailoverSecondaryService(supabase);
      await service.deleteFailoverSecondary(schoolId, id);
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
