'use client';

import { useState, useCallback } from 'react';
import { EduOSBusinessRuleService } from '../services/eduos-business-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { BusinessRule } from '@educi/types';

export const useEduOSBusinessRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: BusinessRule): Promise<BusinessRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBusinessRuleService(supabase);
      return await service.createBusinessRule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BusinessRule>): Promise<BusinessRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBusinessRuleService(supabase);
      return await service.updateBusinessRule(schoolId, id, data);
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
      const service = new EduOSBusinessRuleService(supabase);
      await service.deleteBusinessRule(schoolId, id);
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