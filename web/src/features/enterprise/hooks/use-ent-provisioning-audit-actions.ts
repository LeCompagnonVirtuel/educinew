'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningAuditService } from '../services/provisioning-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningAudit, ProvisioningAuditCreate } from '@educi/types';

export const useEntProvisioningAuditActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningAuditCreate): Promise<ProvisioningAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningAuditService(supabase);
      return await service.createProvisioningAudit(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningAuditCreate>): Promise<ProvisioningAudit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningAuditService(supabase);
      return await service.updateProvisioningAudit(schoolId, id, data);
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
      const service = new EntProvisioningAuditService(supabase);
      await service.deleteProvisioningAudit(schoolId, id);
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
