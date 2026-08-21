'use client';

import { useState, useCallback } from 'react';
import { EntSecurityPolicyService } from '../services/security-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityPolicy, SecurityPolicyCreate } from '@educi/types';

export const useEntSecurityPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SecurityPolicyCreate): Promise<SecurityPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityPolicyService(supabase);
      return await service.createSecurityPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SecurityPolicyCreate>): Promise<SecurityPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityPolicyService(supabase);
      return await service.updateSecurityPolicy(schoolId, id, data);
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
      const service = new EntSecurityPolicyService(supabase);
      await service.deleteSecurityPolicy(schoolId, id);
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
