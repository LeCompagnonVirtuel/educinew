'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningValidationService } from '../services/provisioning-validation.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningValidation, ProvisioningValidationCreate } from '@educi/types';

export const useEntProvisioningValidationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningValidationCreate): Promise<ProvisioningValidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningValidationService(supabase);
      return await service.createProvisioningValidation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningValidationCreate>): Promise<ProvisioningValidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningValidationService(supabase);
      return await service.updateProvisioningValidation(schoolId, id, data);
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
      const service = new EntProvisioningValidationService(supabase);
      await service.deleteProvisioningValidation(schoolId, id);
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
