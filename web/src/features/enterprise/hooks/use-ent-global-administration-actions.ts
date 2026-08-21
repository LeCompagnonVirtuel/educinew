'use client';

import { useState, useCallback } from 'react';
import { EntGlobalAdministrationService } from '../services/global-administration.service';
import { createClient } from '@/lib/supabase/client';
import type { GlobalAdministration, GlobalAdministrationCreate } from '@educi/types';

export const useEntGlobalAdministrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: GlobalAdministrationCreate): Promise<GlobalAdministration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGlobalAdministrationService(supabase);
      return await service.createGlobalAdministration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GlobalAdministrationCreate>): Promise<GlobalAdministration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGlobalAdministrationService(supabase);
      return await service.updateGlobalAdministration(schoolId, id, data);
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
      const service = new EntGlobalAdministrationService(supabase);
      await service.deleteGlobalAdministration(schoolId, id);
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
