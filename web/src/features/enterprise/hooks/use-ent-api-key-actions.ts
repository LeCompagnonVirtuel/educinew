'use client';

import { useState, useCallback } from 'react';
import { EntAPIKeyService } from '../services/api-key.service';
import { createClient } from '@/lib/supabase/client';
import type { APIKey, APIKeyCreate } from '@educi/types';

export const useEntAPIKeyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIKeyCreate): Promise<APIKey | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIKeyService(supabase);
      return await service.createAPIKey(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIKeyCreate>): Promise<APIKey | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIKeyService(supabase);
      return await service.updateAPIKey(schoolId, id, data);
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
      const service = new EntAPIKeyService(supabase);
      await service.deleteAPIKey(schoolId, id);
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
