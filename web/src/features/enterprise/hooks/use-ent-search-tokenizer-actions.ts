'use client';

import { useState, useCallback } from 'react';
import { EntSearchTokenizerService } from '../services/search-tokenizer.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchTokenizer, SearchTokenizerCreate } from '@educi/types';

export const useEntSearchTokenizerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchTokenizerCreate): Promise<SearchTokenizer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchTokenizerService(supabase);
      return await service.createSearchTokenizer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchTokenizerCreate>): Promise<SearchTokenizer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchTokenizerService(supabase);
      return await service.updateSearchTokenizer(schoolId, id, data);
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
      const service = new EntSearchTokenizerService(supabase);
      await service.deleteSearchTokenizer(schoolId, id);
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
