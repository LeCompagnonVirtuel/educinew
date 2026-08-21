'use client';

import { useState, useCallback } from 'react';
import { EntSearchProcessorService } from '../services/search-processor.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchProcessor, SearchProcessorCreate } from '@educi/types';

export const useEntSearchProcessorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchProcessorCreate): Promise<SearchProcessor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchProcessorService(supabase);
      return await service.createSearchProcessor(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchProcessorCreate>): Promise<SearchProcessor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchProcessorService(supabase);
      return await service.updateSearchProcessor(schoolId, id, data);
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
      const service = new EntSearchProcessorService(supabase);
      await service.deleteSearchProcessor(schoolId, id);
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
