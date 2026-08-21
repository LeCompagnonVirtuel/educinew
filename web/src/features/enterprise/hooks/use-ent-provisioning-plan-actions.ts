'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningPlanService } from '../services/provisioning-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningPlan, ProvisioningPlanCreate } from '@educi/types';

export const useEntProvisioningPlanActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningPlanCreate): Promise<ProvisioningPlan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningPlanService(supabase);
      return await service.createProvisioningPlan(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningPlanCreate>): Promise<ProvisioningPlan | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningPlanService(supabase);
      return await service.updateProvisioningPlan(schoolId, id, data);
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
      const service = new EntProvisioningPlanService(supabase);
      await service.deleteProvisioningPlan(schoolId, id);
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
