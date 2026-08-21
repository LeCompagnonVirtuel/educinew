'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningConstraintService } from '../services/provisioning-constraint.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningConstraint, ProvisioningConstraintCreate } from '@educi/types';

export const useEntProvisioningConstraintActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningConstraintCreate): Promise<ProvisioningConstraint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningConstraintService(supabase);
      return await service.createProvisioningConstraint(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningConstraintCreate>): Promise<ProvisioningConstraint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningConstraintService(supabase);
      return await service.updateProvisioningConstraint(schoolId, id, data);
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
      const service = new EntProvisioningConstraintService(supabase);
      await service.deleteProvisioningConstraint(schoolId, id);
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
