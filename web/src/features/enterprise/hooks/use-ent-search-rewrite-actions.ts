'use client';

import { useState, useCallback } from 'react';
import { EntSearchRewriteService } from '../services/search-rewrite.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchRewrite, SearchRewriteCreate } from '@educi/types';

export const useEntSearchRewriteActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchRewriteCreate): Promise<SearchRewrite | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRewriteService(supabase);
      return await service.createSearchRewrite(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchRewriteCreate>): Promise<SearchRewrite | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRewriteService(supabase);
      return await service.updateSearchRewrite(schoolId, id, data);
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
      const service = new EntSearchRewriteService(supabase);
      await service.deleteSearchRewrite(schoolId, id);
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
