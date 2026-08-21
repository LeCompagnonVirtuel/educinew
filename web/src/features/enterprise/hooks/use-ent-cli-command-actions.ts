'use client';

import { useState, useCallback } from 'react';
import { EntCLICommandService } from '../services/cli-command.service';
import { createClient } from '@/lib/supabase/client';
import type { CLICommand, CLICommandCreate } from '@educi/types';

export const useEntCLICommandActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CLICommandCreate): Promise<CLICommand | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLICommandService(supabase);
      return await service.createCLICommand(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CLICommandCreate>): Promise<CLICommand | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLICommandService(supabase);
      return await service.updateCLICommand(schoolId, id, data);
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
      const service = new EntCLICommandService(supabase);
      await service.deleteCLICommand(schoolId, id);
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
