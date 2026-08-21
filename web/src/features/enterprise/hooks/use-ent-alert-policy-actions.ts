'use client';

import { useState, useCallback } from 'react';
import { EntAlertPolicyService } from '../services/alert-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertPolicy, AlertPolicyCreate } from '@educi/types';

export const useEntAlertPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertPolicyCreate): Promise<AlertPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertPolicyService(supabase);
      return await service.createAlertPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertPolicyCreate>): Promise<AlertPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertPolicyService(supabase);
      return await service.updateAlertPolicy(schoolId, id, data);
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
      const service = new EntAlertPolicyService(supabase);
      await service.deleteAlertPolicy(schoolId, id);
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
