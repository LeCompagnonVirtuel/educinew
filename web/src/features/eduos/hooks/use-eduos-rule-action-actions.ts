'use client';

import { useState, useCallback } from 'react';
import { EduOSRuleActionService } from '../services/eduos-rule-action.service';
import { createClient } from '@/lib/supabase/client';
import type { RuleAction } from '@educi/types';

export const useEduOSRuleActionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RuleAction): Promise<RuleAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleActionService(supabase);
      return await service.createRuleAction(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RuleAction>): Promise<RuleAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleActionService(supabase);
      return await service.updateRuleAction(schoolId, id, data);
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
      const service = new EduOSRuleActionService(supabase);
      await service.deleteRuleAction(schoolId, id);
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