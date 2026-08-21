'use client';

import { useState, useCallback } from 'react';
import { EntSearchFacetService } from '../services/search-facet.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchFacet, SearchFacetCreate } from '@educi/types';

export const useEntSearchFacetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchFacetCreate): Promise<SearchFacet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFacetService(supabase);
      return await service.createSearchFacet(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchFacetCreate>): Promise<SearchFacet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchFacetService(supabase);
      return await service.updateSearchFacet(schoolId, id, data);
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
      const service = new EntSearchFacetService(supabase);
      await service.deleteSearchFacet(schoolId, id);
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
