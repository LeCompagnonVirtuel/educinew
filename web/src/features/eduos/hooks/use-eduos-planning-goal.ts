'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSPlanningGoalService } from '../services/eduos-planning-goal.service';
import { createClient } from '@/lib/supabase/client';
import type { PlanningGoal } from '@educi/types';

export const useEduOSPlanningGoalList = (schoolId: string) => {
  const [items, setItems] = useState<PlanningGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningGoalService(supabase);
      const data = await service.listPlanningGoals(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};