'use client';

import { useState, useCallback } from 'react';
import { EntSearchSynonymService } from '../services/search-synonym.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSynonym, SearchSynonymCreate } from '@educi/types';

export const useEntSearchSynonymActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchSynonymCreate): Promise<SearchSynonym | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSynonymService(supabase);
      return await service.createSearchSynonym(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchSynonymCreate>): Promise<SearchSynonym | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSynonymService(supabase);
      return await service.updateSearchSynonym(schoolId, id, data);
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
      const service = new EntSearchSynonymService(supabase);
      await service.deleteSearchSynonym(schoolId, id);
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
