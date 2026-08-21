'use client';

import { useState, useCallback } from 'react';
import { EntIndexRebuildService } from '../services/index-rebuild.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexRebuild, IndexRebuildCreate } from '@educi/types';

export const useEntIndexRebuildActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexRebuildCreate): Promise<IndexRebuild | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexRebuildService(supabase);
      return await service.createIndexRebuild(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexRebuildCreate>): Promise<IndexRebuild | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexRebuildService(supabase);
      return await service.updateIndexRebuild(schoolId, id, data);
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
      const service = new EntIndexRebuildService(supabase);
      await service.deleteIndexRebuild(schoolId, id);
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
