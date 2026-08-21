'use client';

import { useState, useCallback } from 'react';
import { EduOSReasoningEngineService } from '../services/eduos-reasoning-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { ReasoningEngine } from '@educi/types';

export const useEduOSReasoningEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ReasoningEngine): Promise<ReasoningEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningEngineService(supabase);
      return await service.createReasoningEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ReasoningEngine>): Promise<ReasoningEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningEngineService(supabase);
      return await service.updateReasoningEngine(schoolId, id, data);
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
      const service = new EduOSReasoningEngineService(supabase);
      await service.deleteReasoningEngine(schoolId, id);
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