'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudAlertRuleService } from '../services/global-cloud-alert-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertRule } from '@educi/types';

export const useGlobalCloudAlertRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<AlertRule>): Promise<AlertRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudAlertRuleService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertRule>): Promise<AlertRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudAlertRuleService(supabase);
      return await service.update(schoolId, id, data as any);
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
      const service = new GlobalCloudAlertRuleService(supabase);
      await service.delete(schoolId, id);
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