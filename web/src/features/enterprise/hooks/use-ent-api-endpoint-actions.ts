'use client';

import { useState, useCallback } from 'react';
import { EntAPIEndpointService } from '../services/api-endpoint.service';
import { createClient } from '@/lib/supabase/client';
import type { APIEndpoint, APIEndpointCreate } from '@educi/types';

export const useEntAPIEndpointActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIEndpointCreate): Promise<APIEndpoint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIEndpointService(supabase);
      return await service.createAPIEndpoint(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIEndpointCreate>): Promise<APIEndpoint | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIEndpointService(supabase);
      return await service.updateAPIEndpoint(schoolId, id, data);
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
      const service = new EntAPIEndpointService(supabase);
      await service.deleteAPIEndpoint(schoolId, id);
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
