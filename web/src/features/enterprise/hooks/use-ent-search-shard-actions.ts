'use client';

import { useState, useCallback } from 'react';
import { EntSearchShardService } from '../services/search-shard.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchShard, SearchShardCreate } from '@educi/types';

export const useEntSearchShardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchShardCreate): Promise<SearchShard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchShardService(supabase);
      return await service.createSearchShard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchShardCreate>): Promise<SearchShard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchShardService(supabase);
      return await service.updateSearchShard(schoolId, id, data);
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
      const service = new EntSearchShardService(supabase);
      await service.deleteSearchShard(schoolId, id);
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
