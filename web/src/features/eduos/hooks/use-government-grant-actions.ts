'use client';

import { useState, useCallback } from 'react';
import { EduOSGovernmentGrantService } from '../services/eduos-government-grant.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernmentGrant } from '@educi/types';

export const useEduOSGovernmentGrantActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<GovernmentGrant>): Promise<GovernmentGrant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernmentGrantService(supabase);
      return await service.createGovernmentGrant(schoolId, data as GovernmentGrant);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GovernmentGrant>): Promise<GovernmentGrant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernmentGrantService(supabase);
      return await service.updateGovernmentGrant(schoolId, id, data);
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
      const service = new EduOSGovernmentGrantService(supabase);
      await service.deleteGovernmentGrant(schoolId, id);
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
