'use client';

import { useState, useCallback } from 'react';
import { EduOSSubsidyService } from '../services/eduos-subsidy.service';
import { createClient } from '@/lib/supabase/client';
import type { Subsidy } from '@educi/types';

export const useEduOSSubsidyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Subsidy>): Promise<Subsidy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSubsidyService(supabase);
      return await service.createSubsidy(schoolId, data as Subsidy);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Subsidy>): Promise<Subsidy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSubsidyService(supabase);
      return await service.updateSubsidy(schoolId, id, data);
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
      const service = new EduOSSubsidyService(supabase);
      await service.deleteSubsidy(schoolId, id);
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
