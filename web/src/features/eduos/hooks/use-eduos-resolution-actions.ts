'use client';

import { useState, useCallback } from 'react';
import { EduOSResolutionService } from '../services/eduos-resolution.service';
import { createClient } from '@/lib/supabase/client';
import type { Resolution } from '@educi/types';

export const useEduOSResolutionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Resolution>): Promise<Resolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResolutionService(supabase);
      return await service.createResolution(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Resolution>): Promise<Resolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResolutionService(supabase);
      return await service.updateResolution(schoolId, id, data);
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
      const service = new EduOSResolutionService(supabase);
      await service.deleteResolution(schoolId, id);
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
