'use client';

import { useState, useCallback } from 'react';
import { EduOSDataGovernanceRuleService } from '../services/eduos-data-governance-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { DataGovernanceRule } from '@educi/types';

export const useEduOSDataGovernanceRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataGovernanceRule): Promise<DataGovernanceRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataGovernanceRuleService(supabase);
      return await service.createDataGovernanceRule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataGovernanceRule>): Promise<DataGovernanceRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataGovernanceRuleService(supabase);
      return await service.updateDataGovernanceRule(schoolId, id, data);
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
      const service = new EduOSDataGovernanceRuleService(supabase);
      await service.deleteDataGovernanceRule(schoolId, id);
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