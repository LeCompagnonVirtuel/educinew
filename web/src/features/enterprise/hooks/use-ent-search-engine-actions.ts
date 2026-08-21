'use client';

import { useState, useCallback } from 'react';
import { EntSearchEngineService } from '../services/search-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchEngine, SearchEngineCreate } from '@educi/types';

export const useEntSearchEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchEngineCreate): Promise<SearchEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchEngineService(supabase);
      return await service.createSearchEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchEngineCreate>): Promise<SearchEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchEngineService(supabase);
      return await service.updateSearchEngine(schoolId, id, data);
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
      const service = new EntSearchEngineService(supabase);
      await service.deleteSearchEngine(schoolId, id);
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
