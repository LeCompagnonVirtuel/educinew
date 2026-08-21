'use client';

import { useState, useCallback } from 'react';
import { EntSearchScoreService } from '../services/search-score.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchScore, SearchScoreCreate } from '@educi/types';

export const useEntSearchScoreActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchScoreCreate): Promise<SearchScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchScoreService(supabase);
      return await service.createSearchScore(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchScoreCreate>): Promise<SearchScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchScoreService(supabase);
      return await service.updateSearchScore(schoolId, id, data);
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
      const service = new EntSearchScoreService(supabase);
      await service.deleteSearchScore(schoolId, id);
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
