'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveMathSolverService } from '../services/adaptive-math-solver.service';
import { createClient } from '@/lib/supabase/client';
import type { MathSolver } from '@educi/types';

export const useAdaptiveMathSolverList = (schoolId: string) => {
  const [items, setItems] = useState<MathSolver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMathSolverService(supabase);
      const data = await service.listSolvers(schoolId);
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
