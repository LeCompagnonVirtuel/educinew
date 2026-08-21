'use client';

import { useState, useCallback } from 'react';
import { EduOSResourceLimitsService } from '../services/eduos-resource-limits.service';
import { createClient } from '@/lib/supabase/client';
import type { ResourceLimits } from '@educi/types';

export const useEduOSResourceLimitsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ResourceLimits>): Promise<ResourceLimits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResourceLimitsService(supabase);
      return await service.createResourceLimits(schoolId, data as ResourceLimits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ResourceLimits>): Promise<ResourceLimits | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResourceLimitsService(supabase);
      return await service.updateResourceLimits(schoolId, id, data);
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
      const service = new EduOSResourceLimitsService(supabase);
      await service.deleteResourceLimits(schoolId, id);
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
