'use client';

import { useState, useCallback } from 'react';
import { EntPlatformAdoptionService } from '../services/platform-adoption.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAdoption, PlatformAdoptionCreate } from '@educi/types';

export const useEntPlatformAdoptionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformAdoptionCreate): Promise<PlatformAdoption | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAdoptionService(supabase);
      return await service.createPlatformAdoption(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformAdoptionCreate>): Promise<PlatformAdoption | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAdoptionService(supabase);
      return await service.updatePlatformAdoption(schoolId, id, data);
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
      const service = new EntPlatformAdoptionService(supabase);
      await service.deletePlatformAdoption(schoolId, id);
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
