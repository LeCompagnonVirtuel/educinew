'use client';

import { useState, useCallback } from 'react';
import { EntSearchFilterService } from '../services/search-filter.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFilter, SearchFilterCreate } from '@educi/types';

export const useEntSearchFilterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchFilterCreate): Promise<SearchFilter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFilterService(supabase);
      return await service.createSearchFilter(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchFilterCreate>): Promise<SearchFilter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFilterService(supabase);
      return await service.updateSearchFilter(schoolId, id, data);
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
      const service = new EntSearchFilterService(supabase);
      await service.deleteSearchFilter(schoolId, id);
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
