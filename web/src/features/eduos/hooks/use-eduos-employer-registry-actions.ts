'use client';

import { useState, useCallback } from 'react';
import { EduOSEmployerRegistryService } from '../services/eduos-employer-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { EmployerRegistry } from '@educi/types';

export const useEduOSEmployerRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<EmployerRegistry>): Promise<EmployerRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEmployerRegistryService(supabase);
      return await service.createEmployerRegistry(schoolId, data as EmployerRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EmployerRegistry>): Promise<EmployerRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEmployerRegistryService(supabase);
      return await service.updateEmployerRegistry(schoolId, id, data);
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
      const service = new EduOSEmployerRegistryService(supabase);
      await service.deleteEmployerRegistry(schoolId, id);
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
