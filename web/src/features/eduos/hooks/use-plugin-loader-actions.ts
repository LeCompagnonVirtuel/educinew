'use client';

import { useState, useCallback } from 'react';
import { EduOSPluginLoaderService } from '../services/eduos-plugin-loader.service';
import { createClient } from '@/lib/supabase/client';
import type { PluginLoader } from '@educi/types';

export const useEduOSPluginLoaderActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<PluginLoader>): Promise<PluginLoader | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPluginLoaderService(supabase);
      return await service.createPluginLoader(schoolId, data as PluginLoader);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PluginLoader>): Promise<PluginLoader | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPluginLoaderService(supabase);
      return await service.updatePluginLoader(schoolId, id, data);
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
      const service = new EduOSPluginLoaderService(supabase);
      await service.deletePluginLoader(schoolId, id);
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
