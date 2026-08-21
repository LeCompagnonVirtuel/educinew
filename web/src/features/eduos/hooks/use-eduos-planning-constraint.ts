'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSPlanningConstraintService } from '../services/eduos-planning-constraint.service';
import { createClient } from '@/lib/supabase/client';
import type { PlanningConstraint } from '@educi/types';

export const useEduOSPlanningConstraintList = (schoolId: string) => {
  const [items, setItems] = useState<PlanningConstraint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningConstraintService(supabase);
      const data = await service.listPlanningConstraints(schoolId);
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