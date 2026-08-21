'use client';

import { useState, useCallback } from 'react';
import { EduOSSchoolRegistryService } from '../services/eduos-school-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolRegistry } from '@educi/types';

export const useEduOSSchoolRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SchoolRegistry>): Promise<SchoolRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolRegistryService(supabase);
      return await service.createSchoolRegistry(schoolId, data as SchoolRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SchoolRegistry>): Promise<SchoolRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolRegistryService(supabase);
      return await service.updateSchoolRegistry(schoolId, id, data);
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
      const service = new EduOSSchoolRegistryService(supabase);
      await service.deleteSchoolRegistry(schoolId, id);
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
