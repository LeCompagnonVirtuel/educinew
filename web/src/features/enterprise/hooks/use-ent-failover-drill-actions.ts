'use client';

import { useState, useCallback } from 'react';
import { EntFailoverDrillService } from '../services/failover-drill.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverDrill, FailoverDrillCreate } from '@educi/types';

export const useEntFailoverDrillActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverDrillCreate): Promise<FailoverDrill | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverDrillService(supabase);
      return await service.createFailoverDrill(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverDrillCreate>): Promise<FailoverDrill | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverDrillService(supabase);
      return await service.updateFailoverDrill(schoolId, id, data);
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
      const service = new EntFailoverDrillService(supabase);
      await service.deleteFailoverDrill(schoolId, id);
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
