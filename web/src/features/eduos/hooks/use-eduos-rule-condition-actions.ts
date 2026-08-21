'use client';

import { useState, useCallback } from 'react';
import { EduOSRuleConditionService } from '../services/eduos-rule-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { RuleCondition } from '@educi/types';

export const useEduOSRuleConditionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RuleCondition): Promise<RuleCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleConditionService(supabase);
      return await service.createRuleCondition(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RuleCondition>): Promise<RuleCondition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleConditionService(supabase);
      return await service.updateRuleCondition(schoolId, id, data);
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
      const service = new EduOSRuleConditionService(supabase);
      await service.deleteRuleCondition(schoolId, id);
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