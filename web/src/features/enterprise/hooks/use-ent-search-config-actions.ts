'use client';

import { useState, useCallback } from 'react';
import { EntSearchConfigService } from '../services/search-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchConfig, SearchConfigCreate } from '@educi/types';

export const useEntSearchConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchConfigCreate): Promise<SearchConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchConfigService(supabase);
      return await service.createSearchConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchConfigCreate>): Promise<SearchConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchConfigService(supabase);
      return await service.updateSearchConfig(schoolId, id, data);
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
      const service = new EntSearchConfigService(supabase);
      await service.deleteSearchConfig(schoolId, id);
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
