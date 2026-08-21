'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningStepService } from '../services/provisioning-step.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningStep, ProvisioningStepCreate } from '@educi/types';

export const useEntProvisioningStepActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningStepCreate): Promise<ProvisioningStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningStepService(supabase);
      return await service.createProvisioningStep(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningStepCreate>): Promise<ProvisioningStep | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningStepService(supabase);
      return await service.updateProvisioningStep(schoolId, id, data);
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
      const service = new EntProvisioningStepService(supabase);
      await service.deleteProvisioningStep(schoolId, id);
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
