'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningSecurityService } from '../services/provisioning-security.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningSecurity, ProvisioningSecurityCreate } from '@educi/types';

export const useEntProvisioningSecurityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningSecurityCreate): Promise<ProvisioningSecurity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningSecurityService(supabase);
      return await service.createProvisioningSecurity(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningSecurityCreate>): Promise<ProvisioningSecurity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningSecurityService(supabase);
      return await service.updateProvisioningSecurity(schoolId, id, data);
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
      const service = new EntProvisioningSecurityService(supabase);
      await service.deleteProvisioningSecurity(schoolId, id);
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
