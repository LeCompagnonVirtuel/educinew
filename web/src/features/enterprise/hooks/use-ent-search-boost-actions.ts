'use client';

import { useState, useCallback } from 'react';
import { EntSearchBoostService } from '../services/search-boost.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchBoost, SearchBoostCreate } from '@educi/types';

export const useEntSearchBoostActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchBoostCreate): Promise<SearchBoost | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchBoostService(supabase);
      return await service.createSearchBoost(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchBoostCreate>): Promise<SearchBoost | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchBoostService(supabase);
      return await service.updateSearchBoost(schoolId, id, data);
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
      const service = new EntSearchBoostService(supabase);
      await service.deleteSearchBoost(schoolId, id);
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
