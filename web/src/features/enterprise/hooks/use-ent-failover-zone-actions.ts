'use client';

import { useState, useCallback } from 'react';
import { EntFailoverZoneService } from '../services/failover-zone.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverZone, FailoverZoneCreate } from '@educi/types';

export const useEntFailoverZoneActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: FailoverZoneCreate): Promise<FailoverZone | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverZoneService(supabase);
      return await service.createFailoverZone(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FailoverZoneCreate>): Promise<FailoverZone | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverZoneService(supabase);
      return await service.updateFailoverZone(schoolId, id, data);
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
      const service = new EntFailoverZoneService(supabase);
      await service.deleteFailoverZone(schoolId, id);
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
