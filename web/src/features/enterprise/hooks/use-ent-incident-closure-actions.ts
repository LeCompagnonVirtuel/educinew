'use client';

import { useState, useCallback } from 'react';
import { EntIncidentClosureService } from '../services/incident-closure.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentClosure, IncidentClosureCreate } from '@educi/types';

export const useEntIncidentClosureActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentClosureCreate): Promise<IncidentClosure | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentClosureService(supabase);
      return await service.createIncidentClosure(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentClosureCreate>): Promise<IncidentClosure | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentClosureService(supabase);
      return await service.updateIncidentClosure(schoolId, id, data);
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
      const service = new EntIncidentClosureService(supabase);
      await service.deleteIncidentClosure(schoolId, id);
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
