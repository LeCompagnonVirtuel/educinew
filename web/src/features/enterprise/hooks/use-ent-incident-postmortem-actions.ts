'use client';

import { useState, useCallback } from 'react';
import { EntIncidentPostmortemService } from '../services/incident-postmortem.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentPostmortem, IncidentPostmortemCreate } from '@educi/types';

export const useEntIncidentPostmortemActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentPostmortemCreate): Promise<IncidentPostmortem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentPostmortemService(supabase);
      return await service.createIncidentPostmortem(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentPostmortemCreate>): Promise<IncidentPostmortem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentPostmortemService(supabase);
      return await service.updateIncidentPostmortem(schoolId, id, data);
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
      const service = new EntIncidentPostmortemService(supabase);
      await service.deleteIncidentPostmortem(schoolId, id);
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
