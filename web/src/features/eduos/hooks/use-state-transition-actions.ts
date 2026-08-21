'use client';

import { useState, useCallback } from 'react';
import { EduOSStateTransitionService } from '../services/eduos-state-transition.service';
import { createClient } from '@/lib/supabase/client';
import type { StateTransition } from '@educi/types';

export const useEduOSStateTransitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<StateTransition>): Promise<StateTransition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateTransitionService(supabase);
      return await service.createStateTransition(schoolId, data as StateTransition);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StateTransition>): Promise<StateTransition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateTransitionService(supabase);
      return await service.updateStateTransition(schoolId, id, data);
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
      const service = new EduOSStateTransitionService(supabase);
      await service.deleteStateTransition(schoolId, id);
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
