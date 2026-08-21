'use client';

import { useState, useCallback } from 'react';
import { EntAPITestingService } from '../services/api-testing.service';
import { createClient } from '@/lib/supabase/client';
import type { APITesting, APITestingCreate } from '@educi/types';

export const useEntAPITestingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APITestingCreate): Promise<APITesting | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPITestingService(supabase);
      return await service.createAPITesting(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APITestingCreate>): Promise<APITesting | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPITestingService(supabase);
      return await service.updateAPITesting(schoolId, id, data);
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
      const service = new EntAPITestingService(supabase);
      await service.deleteAPITesting(schoolId, id);
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
