'use client';

import { useState, useCallback } from 'react';
import { EntSearchQueryService } from '../services/search-query.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchQuery, SearchQueryCreate } from '@educi/types';

export const useEntSearchQueryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchQueryCreate): Promise<SearchQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchQueryService(supabase);
      return await service.createSearchQuery(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchQueryCreate>): Promise<SearchQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchQueryService(supabase);
      return await service.updateSearchQuery(schoolId, id, data);
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
      const service = new EntSearchQueryService(supabase);
      await service.deleteSearchQuery(schoolId, id);
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
