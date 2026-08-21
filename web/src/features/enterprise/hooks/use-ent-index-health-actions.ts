'use client';

import { useState, useCallback } from 'react';
import { EntIndexHealthService } from '../services/index-health.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexHealth, IndexHealthCreate } from '@educi/types';

export const useEntIndexHealthActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexHealthCreate): Promise<IndexHealth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexHealthService(supabase);
      return await service.createIndexHealth(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexHealthCreate>): Promise<IndexHealth | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexHealthService(supabase);
      return await service.updateIndexHealth(schoolId, id, data);
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
      const service = new EntIndexHealthService(supabase);
      await service.deleteIndexHealth(schoolId, id);
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
