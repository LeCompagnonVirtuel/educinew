'use client';

import { useState, useCallback } from 'react';
import { EntSearchSemanticService } from '../services/search-semantic.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchSemantic, SearchSemanticCreate } from '@educi/types';

export const useEntSearchSemanticActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchSemanticCreate): Promise<SearchSemantic | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSemanticService(supabase);
      return await service.createSearchSemantic(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchSemanticCreate>): Promise<SearchSemantic | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchSemanticService(supabase);
      return await service.updateSearchSemantic(schoolId, id, data);
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
      const service = new EntSearchSemanticService(supabase);
      await service.deleteSearchSemantic(schoolId, id);
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
