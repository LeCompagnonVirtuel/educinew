'use client';

import { useState, useCallback } from 'react';
import { EntIndexLifecycleService } from '../services/index-lifecycle.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexLifecycle, IndexLifecycleCreate } from '@educi/types';

export const useEntIndexLifecycleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexLifecycleCreate): Promise<IndexLifecycle | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexLifecycleService(supabase);
      return await service.createIndexLifecycle(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexLifecycleCreate>): Promise<IndexLifecycle | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexLifecycleService(supabase);
      return await service.updateIndexLifecycle(schoolId, id, data);
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
      const service = new EntIndexLifecycleService(supabase);
      await service.deleteIndexLifecycle(schoolId, id);
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
