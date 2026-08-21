'use client';

import { useState, useCallback } from 'react';
import { AdaptiveAttentionService } from '../services/adaptive-attention.service';
import { createClient } from '@/lib/supabase/client';
import type { AttentionScore, AttentionScoreCreate } from '@educi/types';

export const useAdaptiveAttentionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AttentionScoreCreate): Promise<AttentionScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAttentionService(supabase);
      return await service.createAttentionScore(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AttentionScoreCreate>): Promise<AttentionScore | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAttentionService(supabase);
      return await service.updateAttentionScore(schoolId, id, data);
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
      const service = new AdaptiveAttentionService(supabase);
      await service.deleteAttentionScore(schoolId, id);
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
