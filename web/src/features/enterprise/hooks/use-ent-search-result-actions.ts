'use client';

import { useState, useCallback } from 'react';
import { EntSearchResultService } from '../services/search-result.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchResult, SearchResultCreate } from '@educi/types';

export const useEntSearchResultActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchResultCreate): Promise<SearchResult | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchResultService(supabase);
      return await service.createSearchResult(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchResultCreate>): Promise<SearchResult | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchResultService(supabase);
      return await service.updateSearchResult(schoolId, id, data);
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
      const service = new EntSearchResultService(supabase);
      await service.deleteSearchResult(schoolId, id);
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
