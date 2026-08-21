'use client';

import { useState, useCallback } from 'react';
import { EntGeoFencingService } from '../services/geo-fencing.service';
import { createClient } from '@/lib/supabase/client';
import type { GeoFencing, GeoFencingCreate } from '@educi/types';

export const useEntGeoFencingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: GeoFencingCreate): Promise<GeoFencing | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGeoFencingService(supabase);
      return await service.createGeoFencing(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GeoFencingCreate>): Promise<GeoFencing | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGeoFencingService(supabase);
      return await service.updateGeoFencing(schoolId, id, data);
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
      const service = new EntGeoFencingService(supabase);
      await service.deleteGeoFencing(schoolId, id);
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
