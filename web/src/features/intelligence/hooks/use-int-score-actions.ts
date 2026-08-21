'use client';

import { useState, useCallback } from 'react';
import { IntScoreService } from '../services/int-score.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceScore, IntelligenceScoreCreate } from '@educi/types';

export const useIntScoreActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceScoreCreate): Promise<IntelligenceScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntScoreService(supabase);
      return await service.createScore(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceScoreCreate>): Promise<IntelligenceScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntScoreService(supabase);
      return await service.updateScore(schoolId, id, data);
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
      const service = new IntScoreService(supabase);
      await service.deleteScore(schoolId, id);
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
