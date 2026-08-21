'use client';

import { useState, useCallback } from 'react';
import { EntSearchStemmerService } from '../services/search-stemmer.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchStemmer, SearchStemmerCreate } from '@educi/types';

export const useEntSearchStemmerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchStemmerCreate): Promise<SearchStemmer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStemmerService(supabase);
      return await service.createSearchStemmer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchStemmerCreate>): Promise<SearchStemmer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStemmerService(supabase);
      return await service.updateSearchStemmer(schoolId, id, data);
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
      const service = new EntSearchStemmerService(supabase);
      await service.deleteSearchStemmer(schoolId, id);
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
