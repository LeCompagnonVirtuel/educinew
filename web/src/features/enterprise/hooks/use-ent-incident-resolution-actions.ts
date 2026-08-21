'use client';

import { useState, useCallback } from 'react';
import { EntIncidentResolutionService } from '../services/incident-resolution.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentResolution, IncidentResolutionCreate } from '@educi/types';

export const useEntIncidentResolutionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentResolutionCreate): Promise<IncidentResolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentResolutionService(supabase);
      return await service.createIncidentResolution(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentResolutionCreate>): Promise<IncidentResolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentResolutionService(supabase);
      return await service.updateIncidentResolution(schoolId, id, data);
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
      const service = new EntIncidentResolutionService(supabase);
      await service.deleteIncidentResolution(schoolId, id);
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
