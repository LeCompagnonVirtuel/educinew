'use client';

import { useState, useCallback } from 'react';
import { EduOSIntegrationConnectorService } from '../services/eduos-integration-connector.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationConnector } from '@educi/types';

export const useEduOSIntegrationConnectorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntegrationConnector): Promise<IntegrationConnector | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationConnectorService(supabase);
      return await service.createIntegrationConnector(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntegrationConnector>): Promise<IntegrationConnector | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationConnectorService(supabase);
      return await service.updateIntegrationConnector(schoolId, id, data);
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
      const service = new EduOSIntegrationConnectorService(supabase);
      await service.deleteIntegrationConnector(schoolId, id);
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