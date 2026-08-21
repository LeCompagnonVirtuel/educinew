'use client';

import { useState, useCallback } from 'react';
import { EntSearchExpansionService } from '../services/search-expansion.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchExpansion, SearchExpansionCreate } from '@educi/types';

export const useEntSearchExpansionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchExpansionCreate): Promise<SearchExpansion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchExpansionService(supabase);
      return await service.createSearchExpansion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchExpansionCreate>): Promise<SearchExpansion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchExpansionService(supabase);
      return await service.updateSearchExpansion(schoolId, id, data);
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
      const service = new EntSearchExpansionService(supabase);
      await service.deleteSearchExpansion(schoolId, id);
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
