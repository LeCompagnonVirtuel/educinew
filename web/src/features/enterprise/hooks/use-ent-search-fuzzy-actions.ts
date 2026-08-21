'use client';

import { useState, useCallback } from 'react';
import { EntSearchFuzzyService } from '../services/search-fuzzy.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFuzzy, SearchFuzzyCreate } from '@educi/types';

export const useEntSearchFuzzyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchFuzzyCreate): Promise<SearchFuzzy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFuzzyService(supabase);
      return await service.createSearchFuzzy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchFuzzyCreate>): Promise<SearchFuzzy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFuzzyService(supabase);
      return await service.updateSearchFuzzy(schoolId, id, data);
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
      const service = new EntSearchFuzzyService(supabase);
      await service.deleteSearchFuzzy(schoolId, id);
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
