'use client';

import { useState, useCallback } from 'react';
import { IntAiInsightService } from '../services/int-ai-insight.service';
import { createClient } from '@/lib/supabase/client';
import type { AIInsight, AIInsightCreate } from '@educi/types';

export const useIntAiInsightActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIInsightCreate): Promise<AIInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAiInsightService(supabase);
      return await service.createAIInsight(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIInsightCreate>): Promise<AIInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAiInsightService(supabase);
      return await service.updateAIInsight(schoolId, id, data);
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
      const service = new IntAiInsightService(supabase);
      await service.deleteAIInsight(schoolId, id);
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