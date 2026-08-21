'use client';

import { useState, useCallback } from 'react';
import { EntCLIPluginService } from '../services/cli-plugin.service';
import { createClient } from '@/lib/supabase/client';
import type { CLIPlugin, CLIPluginCreate } from '@educi/types';

export const useEntCLIPluginActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CLIPluginCreate): Promise<CLIPlugin | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLIPluginService(supabase);
      return await service.createCLIPlugin(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CLIPluginCreate>): Promise<CLIPlugin | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLIPluginService(supabase);
      return await service.updateCLIPlugin(schoolId, id, data);
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
      const service = new EntCLIPluginService(supabase);
      await service.deleteCLIPlugin(schoolId, id);
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
