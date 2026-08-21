'use client';

import { useState, useCallback } from 'react';
import { EntSearchAnalyzerService } from '../services/search-analyzer.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchAnalyzer, SearchAnalyzerCreate } from '@educi/types';

export const useEntSearchAnalyzerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchAnalyzerCreate): Promise<SearchAnalyzer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAnalyzerService(supabase);
      return await service.createSearchAnalyzer(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchAnalyzerCreate>): Promise<SearchAnalyzer | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAnalyzerService(supabase);
      return await service.updateSearchAnalyzer(schoolId, id, data);
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
      const service = new EntSearchAnalyzerService(supabase);
      await service.deleteSearchAnalyzer(schoolId, id);
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
