'use client';

import { useState, useCallback } from 'react';
import { AdaptiveLeaderboardService } from '../services/adaptive-leaderboard.service';
import { createClient } from '@/lib/supabase/client';
import type { Leaderboard } from '@educi/types';

export const useAdaptiveLeaderboardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Leaderboard, 'id' | 'created_at'>): Promise<Leaderboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLeaderboardService(supabase);
      return await service.createLeaderboard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Leaderboard, 'id' | 'created_at'>>): Promise<Leaderboard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLeaderboardService(supabase);
      return await service.updateLeaderboard(schoolId, id, data);
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
      const service = new AdaptiveLeaderboardService(supabase);
      await service.deleteLeaderboard(schoolId, id);
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
