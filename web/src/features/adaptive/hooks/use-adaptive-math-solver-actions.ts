'use client';

import { useState, useCallback } from 'react';
import { AdaptiveMathSolverService } from '../services/adaptive-math-solver.service';
import { createClient } from '@/lib/supabase/client';
import type { MathSolver, MathSolverCreate } from '@educi/types';

export const useAdaptiveMathSolverActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MathSolverCreate): Promise<MathSolver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMathSolverService(supabase);
      return await service.createSolver(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MathSolverCreate>): Promise<MathSolver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMathSolverService(supabase);
      return await service.updateSolver(schoolId, id, data);
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
      const service = new AdaptiveMathSolverService(supabase);
      await service.deleteSolver(schoolId, id);
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
