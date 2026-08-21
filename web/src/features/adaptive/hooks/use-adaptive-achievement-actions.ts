'use client';

import { useState, useCallback } from 'react';
import { AdaptiveAchievementService } from '../services/adaptive-achievement.service';
import { createClient } from '@/lib/supabase/client';
import type { Achievement } from '@educi/types';

export const useAdaptiveAchievementActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Achievement, 'id' | 'created_at'>): Promise<Achievement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAchievementService(supabase);
      return await service.createAchievement(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Achievement, 'id' | 'created_at'>>): Promise<Achievement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAchievementService(supabase);
      return await service.updateAchievement(schoolId, id, data);
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
      const service = new AdaptiveAchievementService(supabase);
      await service.deleteAchievement(schoolId, id);
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
