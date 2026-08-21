'use client';

import { useState, useCallback } from 'react';
import { EntSearchStopwordService } from '../services/search-stopword.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchStopword, SearchStopwordCreate } from '@educi/types';

export const useEntSearchStopwordActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchStopwordCreate): Promise<SearchStopword | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStopwordService(supabase);
      return await service.createSearchStopword(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchStopwordCreate>): Promise<SearchStopword | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchStopwordService(supabase);
      return await service.updateSearchStopword(schoolId, id, data);
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
      const service = new EntSearchStopwordService(supabase);
      await service.deleteSearchStopword(schoolId, id);
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
