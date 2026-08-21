'use client';

import { useState, useCallback } from 'react';
import { EduOSDecisionEngineService } from '../services/eduos-decision-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { DecisionEngine } from '@educi/types';

export const useEduOSDecisionEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DecisionEngine): Promise<DecisionEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionEngineService(supabase);
      return await service.createDecisionEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DecisionEngine>): Promise<DecisionEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionEngineService(supabase);
      return await service.updateDecisionEngine(schoolId, id, data);
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
      const service = new EduOSDecisionEngineService(supabase);
      await service.deleteDecisionEngine(schoolId, id);
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