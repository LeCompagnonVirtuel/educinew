'use client';

import { useState, useCallback } from 'react';
import { EduOSReasoningRuleService } from '../services/eduos-reasoning-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { ReasoningRule } from '@educi/types';

export const useEduOSReasoningRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ReasoningRule): Promise<ReasoningRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningRuleService(supabase);
      return await service.createReasoningRule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ReasoningRule>): Promise<ReasoningRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningRuleService(supabase);
      return await service.updateReasoningRule(schoolId, id, data);
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
      const service = new EduOSReasoningRuleService(supabase);
      await service.deleteReasoningRule(schoolId, id);
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