'use client';

import { useState, useCallback } from 'react';
import { EduOSServiceRegistryService } from '../services/eduos-service-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceRegistry } from '@educi/types';

export const useEduOSServiceRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ServiceRegistry>): Promise<ServiceRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSServiceRegistryService(supabase);
      return await service.createServiceRegistry(schoolId, data as ServiceRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ServiceRegistry>): Promise<ServiceRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSServiceRegistryService(supabase);
      return await service.updateServiceRegistry(schoolId, id, data);
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
      const service = new EduOSServiceRegistryService(supabase);
      await service.deleteServiceRegistry(schoolId, id);
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
