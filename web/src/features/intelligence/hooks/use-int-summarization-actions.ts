'use client';

import { useState, useCallback } from 'react';
import { IntSummarizationService } from '../services/int-summarization.service';
import { createClient } from '@/lib/supabase/client';
import type { TextSummarization, TextSummarizationCreate } from '@educi/types';

export const useIntSummarizationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TextSummarizationCreate): Promise<TextSummarization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSummarizationService(supabase);
      return await service.createSummarization(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TextSummarizationCreate>): Promise<TextSummarization | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSummarizationService(supabase);
      return await service.updateSummarization(schoolId, id, data);
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
      const service = new IntSummarizationService(supabase);
      await service.deleteSummarization(schoolId, id);
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