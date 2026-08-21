'use client';

import { useState, useCallback } from 'react';
import { EntQualityPolicyService } from '../services/quality-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityPolicy, QualityPolicyCreate } from '@educi/types';

export const useEntQualityPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QualityPolicyCreate): Promise<QualityPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityPolicyService(supabase);
      return await service.createQualityPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<QualityPolicyCreate>): Promise<QualityPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityPolicyService(supabase);
      return await service.updateQualityPolicy(schoolId, id, data);
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
      const service = new EntQualityPolicyService(supabase);
      await service.deleteQualityPolicy(schoolId, id);
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
