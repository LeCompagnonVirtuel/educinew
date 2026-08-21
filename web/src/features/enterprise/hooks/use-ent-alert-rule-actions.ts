'use client';

import { useState, useCallback } from 'react';
import { EntAlertRuleService } from '../services/alert-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertRule, AlertRuleCreate } from '@educi/types';

export const useEntAlertRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertRuleCreate): Promise<AlertRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertRuleService(supabase);
      return await service.createAlertRule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertRuleCreate>): Promise<AlertRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertRuleService(supabase);
      return await service.updateAlertRule(schoolId, id, data);
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
      const service = new EntAlertRuleService(supabase);
      await service.deleteAlertRule(schoolId, id);
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
