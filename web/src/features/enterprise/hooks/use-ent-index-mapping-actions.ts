'use client';

import { useState, useCallback } from 'react';
import { EntIndexMappingService } from '../services/index-mapping.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexMapping, IndexMappingCreate } from '@educi/types';

export const useEntIndexMappingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexMappingCreate): Promise<IndexMapping | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexMappingService(supabase);
      return await service.createIndexMapping(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexMappingCreate>): Promise<IndexMapping | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexMappingService(supabase);
      return await service.updateIndexMapping(schoolId, id, data);
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
      const service = new EntIndexMappingService(supabase);
      await service.deleteIndexMapping(schoolId, id);
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
