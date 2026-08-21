'use client';

import { useState, useCallback } from 'react';
import { EntSearchReplicaService } from '../services/search-replica.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchReplica, SearchReplicaCreate } from '@educi/types';

export const useEntSearchReplicaActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchReplicaCreate): Promise<SearchReplica | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchReplicaService(supabase);
      return await service.createSearchReplica(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchReplicaCreate>): Promise<SearchReplica | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchReplicaService(supabase);
      return await service.updateSearchReplica(schoolId, id, data);
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
      const service = new EntSearchReplicaService(supabase);
      await service.deleteSearchReplica(schoolId, id);
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
