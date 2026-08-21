'use client';

import { useState, useCallback } from 'react';
import { EduOSGraduateRegistryService } from '../services/eduos-graduate-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { GraduateRegistry } from '@educi/types';

export const useEduOSGraduateRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<GraduateRegistry>): Promise<GraduateRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGraduateRegistryService(supabase);
      return await service.createGraduateRegistry(schoolId, data as GraduateRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GraduateRegistry>): Promise<GraduateRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGraduateRegistryService(supabase);
      return await service.updateGraduateRegistry(schoolId, id, data);
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
      const service = new EduOSGraduateRegistryService(supabase);
      await service.deleteGraduateRegistry(schoolId, id);
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
