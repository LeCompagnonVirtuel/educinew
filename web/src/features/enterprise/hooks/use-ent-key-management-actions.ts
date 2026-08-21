'use client';

import { useState, useCallback } from 'react';
import { EntKeyManagementService } from '../services/key-management.service';
import { createClient } from '@/lib/supabase/client';
import type { KeyManagement, KeyManagementCreate } from '@educi/types';

export const useEntKeyManagementActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: KeyManagementCreate): Promise<KeyManagement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntKeyManagementService(supabase);
      return await service.createKeyManagement(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<KeyManagementCreate>): Promise<KeyManagement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntKeyManagementService(supabase);
      return await service.updateKeyManagement(schoolId, id, data);
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
      const service = new EntKeyManagementService(supabase);
      await service.deleteKeyManagement(schoolId, id);
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
