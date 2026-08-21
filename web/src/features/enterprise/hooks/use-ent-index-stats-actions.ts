'use client';

import { useState, useCallback } from 'react';
import { EntIndexStatsService } from '../services/index-stats.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexStats, IndexStatsCreate } from '@educi/types';

export const useEntIndexStatsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexStatsCreate): Promise<IndexStats | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexStatsService(supabase);
      return await service.createIndexStats(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexStatsCreate>): Promise<IndexStats | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexStatsService(supabase);
      return await service.updateIndexStats(schoolId, id, data);
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
      const service = new EntIndexStatsService(supabase);
      await service.deleteIndexStats(schoolId, id);
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
