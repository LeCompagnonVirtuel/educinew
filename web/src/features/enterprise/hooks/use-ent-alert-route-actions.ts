'use client';

import { useState, useCallback } from 'react';
import { EntAlertRouteService } from '../services/alert-route.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertRoute, AlertRouteCreate } from '@educi/types';

export const useEntAlertRouteActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertRouteCreate): Promise<AlertRoute | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertRouteService(supabase);
      return await service.createAlertRoute(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertRouteCreate>): Promise<AlertRoute | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertRouteService(supabase);
      return await service.updateAlertRoute(schoolId, id, data);
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
      const service = new EntAlertRouteService(supabase);
      await service.deleteAlertRoute(schoolId, id);
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
