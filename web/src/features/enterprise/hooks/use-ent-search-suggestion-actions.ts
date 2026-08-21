'use client';

import { useState, useCallback } from 'react';
import { EntSearchSuggestionService } from '../services/search-suggestion.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSuggestion, SearchSuggestionCreate } from '@educi/types';

export const useEntSearchSuggestionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchSuggestionCreate): Promise<SearchSuggestion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSuggestionService(supabase);
      return await service.createSearchSuggestion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchSuggestionCreate>): Promise<SearchSuggestion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSuggestionService(supabase);
      return await service.updateSearchSuggestion(schoolId, id, data);
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
      const service = new EntSearchSuggestionService(supabase);
      await service.deleteSearchSuggestion(schoolId, id);
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
