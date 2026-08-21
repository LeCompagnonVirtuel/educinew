'use client';

import { useState, useCallback } from 'react';
import { IntRecommendationService } from '../services/int-recommendation.service';
import { createClient } from '@/lib/supabase/client';
import type { Recommendation, RecommendationCreate } from '@educi/types';

export const useIntRecommendationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RecommendationCreate): Promise<Recommendation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntRecommendationService(supabase);
      return await service.createRecommendation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RecommendationCreate>): Promise<Recommendation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntRecommendationService(supabase);
      return await service.updateRecommendation(schoolId, id, data);
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
      const service = new IntRecommendationService(supabase);
      await service.deleteRecommendation(schoolId, id);
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
