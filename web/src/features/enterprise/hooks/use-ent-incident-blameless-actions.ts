'use client';

import { useState, useCallback } from 'react';
import { EntIncidentBlamelessService } from '../services/incident-blameless.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentBlameless, IncidentBlamelessCreate } from '@educi/types';

export const useEntIncidentBlamelessActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentBlamelessCreate): Promise<IncidentBlameless | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentBlamelessService(supabase);
      return await service.createIncidentBlameless(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentBlamelessCreate>): Promise<IncidentBlameless | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentBlamelessService(supabase);
      return await service.updateIncidentBlameless(schoolId, id, data);
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
      const service = new EntIncidentBlamelessService(supabase);
      await service.deleteIncidentBlameless(schoolId, id);
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
