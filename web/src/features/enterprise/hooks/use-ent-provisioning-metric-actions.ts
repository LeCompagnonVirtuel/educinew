'use client';

import { useState, useCallback } from 'react';
import { EntProvisioningMetricService } from '../services/provisioning-metric.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningMetric, ProvisioningMetricCreate } from '@educi/types';

export const useEntProvisioningMetricActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProvisioningMetricCreate): Promise<ProvisioningMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningMetricService(supabase);
      return await service.createProvisioningMetric(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProvisioningMetricCreate>): Promise<ProvisioningMetric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningMetricService(supabase);
      return await service.updateProvisioningMetric(schoolId, id, data);
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
      const service = new EntProvisioningMetricService(supabase);
      await service.deleteProvisioningMetric(schoolId, id);
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
