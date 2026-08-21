'use client';

import { useState, useCallback } from 'react';
import { EduOSIntegrationMappingService } from '../services/eduos-integration-mapping.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationMapping } from '@educi/types';

export const useEduOSIntegrationMappingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntegrationMapping): Promise<IntegrationMapping | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationMappingService(supabase);
      return await service.createIntegrationMapping(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntegrationMapping>): Promise<IntegrationMapping | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationMappingService(supabase);
      return await service.updateIntegrationMapping(schoolId, id, data);
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
      const service = new EduOSIntegrationMappingService(supabase);
      await service.deleteIntegrationMapping(schoolId, id);
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