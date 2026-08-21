'use client';

import { useState, useCallback } from 'react';
import { EntSearchSnippetService } from '../services/search-snippet.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSnippet, SearchSnippetCreate } from '@educi/types';

export const useEntSearchSnippetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchSnippetCreate): Promise<SearchSnippet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSnippetService(supabase);
      return await service.createSearchSnippet(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchSnippetCreate>): Promise<SearchSnippet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSnippetService(supabase);
      return await service.updateSearchSnippet(schoolId, id, data);
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
      const service = new EntSearchSnippetService(supabase);
      await service.deleteSearchSnippet(schoolId, id);
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
