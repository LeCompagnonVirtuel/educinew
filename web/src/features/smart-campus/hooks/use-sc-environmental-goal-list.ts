'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEnvironmentalGoalService } from '../services/sc-environmental-goal.service';
import { createClient } from '@/lib/supabase/client';
import type { EnvironmentalGoal } from '@educi/types';

export const useScEnvironmentalGoalList = (schoolId: string) => {
  const [goals, setGoals] = useState<EnvironmentalGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEnvironmentalGoalService(createClient());
      const data = await service.listGoals(schoolId);
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return { goals, loading, error, refresh: fetchGoals };
};
