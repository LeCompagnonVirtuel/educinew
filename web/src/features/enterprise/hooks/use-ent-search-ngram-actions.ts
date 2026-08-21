'use client';

import { useState, useCallback } from 'react';
import { EntSearchNgramService } from '../services/search-ngram.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchNgram, SearchNgramCreate } from '@educi/types';

export const useEntSearchNgramActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchNgramCreate): Promise<SearchNgram | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchNgramService(supabase);
      return await service.createSearchNgram(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchNgramCreate>): Promise<SearchNgram | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchNgramService(supabase);
      return await service.updateSearchNgram(schoolId, id, data);
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
      const service = new EntSearchNgramService(supabase);
      await service.deleteSearchNgram(schoolId, id);
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
