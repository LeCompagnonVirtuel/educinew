'use client';

import { useState, useCallback } from 'react';
import { EntSearchRankingService } from '../services/search-ranking.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchRanking, SearchRankingCreate } from '@educi/types';

export const useEntSearchRankingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchRankingCreate): Promise<SearchRanking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRankingService(supabase);
      return await service.createSearchRanking(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchRankingCreate>): Promise<SearchRanking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchRankingService(supabase);
      return await service.updateSearchRanking(schoolId, id, data);
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
      const service = new EntSearchRankingService(supabase);
      await service.deleteSearchRanking(schoolId, id);
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
