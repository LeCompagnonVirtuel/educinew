'use client';

import { useState, useCallback } from 'react';
import { EntSearchHighlightService } from '../services/search-highlight.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchHighlight, SearchHighlightCreate } from '@educi/types';

export const useEntSearchHighlightActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchHighlightCreate): Promise<SearchHighlight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchHighlightService(supabase);
      return await service.createSearchHighlight(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchHighlightCreate>): Promise<SearchHighlight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchHighlightService(supabase);
      return await service.updateSearchHighlight(schoolId, id, data);
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
      const service = new EntSearchHighlightService(supabase);
      await service.deleteSearchHighlight(schoolId, id);
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
