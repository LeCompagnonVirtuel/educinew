'use client';

import { useState, useCallback } from 'react';
import { AdaptiveRecommendedVideoService } from '../services/adaptive-recommended-video.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedVideo, RecommendedVideoCreate } from '@educi/types';

export const useAdaptiveRecommendedVideoActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RecommendedVideoCreate): Promise<RecommendedVideo | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedVideoService(supabase);
      return await service.createVideo(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RecommendedVideoCreate>): Promise<RecommendedVideo | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedVideoService(supabase);
      return await service.updateVideo(schoolId, id, data);
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
      const service = new AdaptiveRecommendedVideoService(supabase);
      await service.deleteVideo(schoolId, id);
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
