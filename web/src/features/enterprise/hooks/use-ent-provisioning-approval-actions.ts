'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningApprovalService } from '../services/provisioning-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningApproval, ProvisioningApprovalCreate } from '@educi/types';

export const useEntProvisioningApprovalActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningApprovalCreate): Promise<ProvisioningApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningApprovalService(supabase);
      return await service.createProvisioningApproval(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningApprovalCreate>): Promise<ProvisioningApproval | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningApprovalService(supabase);
      return await service.updateProvisioningApproval(schoolId, id, data);
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
      const service = new EntProvisioningApprovalService(supabase);
      await service.deleteProvisioningApproval(schoolId, id);
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
