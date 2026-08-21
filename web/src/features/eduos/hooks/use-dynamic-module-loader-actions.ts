'use client';

import { useState, useCallback } from 'react';
import { EduOSDynamicModuleLoaderService } from '../services/eduos-dynamic-module-loader.service';
import { createClient } from '@/lib/supabase/client';
import type { DynamicModuleLoader } from '@educi/types';

export const useEduOSDynamicModuleLoaderActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDynamicModuleLoaderService(supabase);
      return await service.createDynamicModuleLoader(schoolId, data as DynamicModuleLoader);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDynamicModuleLoaderService(supabase);
      return await service.updateDynamicModuleLoader(schoolId, id, data);
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
      const service = new EduOSDynamicModuleLoaderService(supabase);
      await service.deleteDynamicModuleLoader(schoolId, id);
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
