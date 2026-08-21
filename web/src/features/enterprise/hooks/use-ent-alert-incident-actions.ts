'use client';

import { useState, useCallback } from 'react';
import { EntAlertIncidentService } from '../services/alert-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertIncident, AlertIncidentCreate } from '@educi/types';

export const useEntAlertIncidentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertIncidentCreate): Promise<AlertIncident | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertIncidentService(supabase);
      return await service.createAlertIncident(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertIncidentCreate>): Promise<AlertIncident | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertIncidentService(supabase);
      return await service.updateAlertIncident(schoolId, id, data);
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
      const service = new EntAlertIncidentService(supabase);
      await service.deleteAlertIncident(schoolId, id);
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
