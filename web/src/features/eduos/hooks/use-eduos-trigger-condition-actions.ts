'use client';

import { useState, useCallback } from 'react';
import { EduOSTriggerConditionService } from '../services/eduos-trigger-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { TriggerCondition } from '@educi/types';

export const useEduOSTriggerConditionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TriggerCondition): Promise<TriggerCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTriggerConditionService(supabase);
      return await service.createTriggerCondition(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TriggerCondition>): Promise<TriggerCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTriggerConditionService(supabase);
      return await service.updateTriggerCondition(schoolId, id, data);
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
      const service = new EduOSTriggerConditionService(supabase);
      await service.deleteTriggerCondition(schoolId, id);
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