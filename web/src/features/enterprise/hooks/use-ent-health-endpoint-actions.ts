'use client';

import { useState, useCallback } from 'react';
import { EntHealthEndpointService } from '../services/health-endpoint.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthEndpoint, HealthEndpointCreate } from '@educi/types';

export const useEntHealthEndpointActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthEndpointCreate): Promise<HealthEndpoint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthEndpointService(supabase);
      return await service.createHealthEndpoint(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthEndpointCreate>): Promise<HealthEndpoint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthEndpointService(supabase);
      return await service.updateHealthEndpoint(schoolId, id, data);
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
      const service = new EntHealthEndpointService(supabase);
      await service.deleteHealthEndpoint(schoolId, id);
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
