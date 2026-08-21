'use client';

import { useState, useCallback } from 'react';
import { EntSearchIndexService } from '../services/search-index.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchIndex, SearchIndexCreate } from '@educi/types';

export const useEntSearchIndexActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchIndexCreate): Promise<SearchIndex | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchIndexService(supabase);
      return await service.createSearchIndex(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchIndexCreate>): Promise<SearchIndex | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchIndexService(supabase);
      return await service.updateSearchIndex(schoolId, id, data);
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
      const service = new EntSearchIndexService(supabase);
      await service.deleteSearchIndex(schoolId, id);
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
