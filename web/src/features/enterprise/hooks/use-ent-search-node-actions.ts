'use client';

import { useState, useCallback } from 'react';
import { EntSearchNodeService } from '../services/search-node.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchNode, SearchNodeCreate } from '@educi/types';

export const useEntSearchNodeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchNodeCreate): Promise<SearchNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchNodeService(supabase);
      return await service.createSearchNode(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchNodeCreate>): Promise<SearchNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchNodeService(supabase);
      return await service.updateSearchNode(schoolId, id, data);
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
      const service = new EntSearchNodeService(supabase);
      await service.deleteSearchNode(schoolId, id);
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
