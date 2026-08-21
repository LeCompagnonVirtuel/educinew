'use client';

import { useState, useCallback } from 'react';
import { AdaptiveTimelineService } from '../services/adaptive-timeline.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningTimeline, LearningTimelineCreate } from '@educi/types';

export const useAdaptiveTimelineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LearningTimelineCreate): Promise<LearningTimeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTimelineService(supabase);
      return await service.createTimeline(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LearningTimelineCreate>): Promise<LearningTimeline | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTimelineService(supabase);
      return await service.updateTimeline(schoolId, id, data);
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
      const service = new AdaptiveTimelineService(supabase);
      await service.deleteTimeline(schoolId, id);
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
