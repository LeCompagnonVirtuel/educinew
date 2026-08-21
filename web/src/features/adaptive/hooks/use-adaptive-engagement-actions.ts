'use client';

import { useState, useCallback } from 'react';
import { AdaptiveEngagementService } from '../services/adaptive-engagement.service';
import { createClient } from '@/lib/supabase/client';
import type { EngagementIndex, EngagementIndexCreate } from '@educi/types';

export const useAdaptiveEngagementActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EngagementIndexCreate): Promise<EngagementIndex | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEngagementService(supabase);
      return await service.createEngagementIndex(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EngagementIndexCreate>): Promise<EngagementIndex | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEngagementService(supabase);
      return await service.updateEngagementIndex(schoolId, id, data);
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
      const service = new AdaptiveEngagementService(supabase);
      await service.deleteEngagementIndex(schoolId, id);
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
