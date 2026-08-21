'use client';

import { useState, useCallback } from 'react';
import { EntSearchPhoneticService } from '../services/search-phonetic.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchPhonetic, SearchPhoneticCreate } from '@educi/types';

export const useEntSearchPhoneticActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchPhoneticCreate): Promise<SearchPhonetic | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPhoneticService(supabase);
      return await service.createSearchPhonetic(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchPhoneticCreate>): Promise<SearchPhonetic | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPhoneticService(supabase);
      return await service.updateSearchPhonetic(schoolId, id, data);
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
      const service = new EntSearchPhoneticService(supabase);
      await service.deleteSearchPhonetic(schoolId, id);
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
