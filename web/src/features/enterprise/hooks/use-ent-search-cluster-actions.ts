'use client';

import { useState, useCallback } from 'react';
import { EntSearchClusterService } from '../services/search-cluster.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchCluster, SearchClusterCreate } from '@educi/types';

export const useEntSearchClusterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchClusterCreate): Promise<SearchCluster | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchClusterService(supabase);
      return await service.createSearchCluster(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchClusterCreate>): Promise<SearchCluster | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchClusterService(supabase);
      return await service.updateSearchCluster(schoolId, id, data);
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
      const service = new EntSearchClusterService(supabase);
      await service.deleteSearchCluster(schoolId, id);
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
