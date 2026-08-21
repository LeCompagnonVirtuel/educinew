'use client';

import { useState, useCallback } from 'react';
import { EduOSPlanningConstraintService } from '../services/eduos-planning-constraint.service';
import { createClient } from '@/lib/supabase/client';
import type { PlanningConstraint } from '@educi/types';

export const useEduOSPlanningConstraintActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlanningConstraint): Promise<PlanningConstraint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningConstraintService(supabase);
      return await service.createPlanningConstraint(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlanningConstraint>): Promise<PlanningConstraint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningConstraintService(supabase);
      return await service.updatePlanningConstraint(schoolId, id, data);
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
      const service = new EduOSPlanningConstraintService(supabase);
      await service.deletePlanningConstraint(schoolId, id);
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