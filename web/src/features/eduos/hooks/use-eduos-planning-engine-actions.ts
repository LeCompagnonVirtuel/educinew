'use client';

import { useState, useCallback } from 'react';
import { EduOSPlanningEngineService } from '../services/eduos-planning-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { PlanningEngine } from '@educi/types';

export const useEduOSPlanningEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlanningEngine): Promise<PlanningEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningEngineService(supabase);
      return await service.createPlanningEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlanningEngine>): Promise<PlanningEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPlanningEngineService(supabase);
      return await service.updatePlanningEngine(schoolId, id, data);
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
      const service = new EduOSPlanningEngineService(supabase);
      await service.deletePlanningEngine(schoolId, id);
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