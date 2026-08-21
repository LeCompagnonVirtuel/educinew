'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveLeaderboardService } from '../services/adaptive-leaderboard.service';
import { createClient } from '@/lib/supabase/client';
import type { Leaderboard } from '@educi/types';

export const useAdaptiveLeaderboardList = (schoolId: string) => {
  const [items, setItems] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLeaderboardService(supabase);
      const data = await service.listLeaderboards(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
