'use client';

import { useState, useCallback } from 'react';
import { EduOSModuleRegistryService } from '../services/eduos-module-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ModuleRegistry } from '@educi/types';

export const useEduOSModuleRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ModuleRegistry>): Promise<ModuleRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSModuleRegistryService(supabase);
      return await service.createModuleRegistry(schoolId, data as ModuleRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ModuleRegistry>): Promise<ModuleRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSModuleRegistryService(supabase);
      return await service.updateModuleRegistry(schoolId, id, data);
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
      const service = new EduOSModuleRegistryService(supabase);
      await service.deleteModuleRegistry(schoolId, id);
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
