'use client';

import { useState, useCallback } from 'react';
import { EduOSStudentRegistryService } from '../services/eduos-student-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentRegistry } from '@educi/types';

export const useEduOSStudentRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<StudentRegistry>): Promise<StudentRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentRegistryService(supabase);
      return await service.createStudentRegistry(schoolId, data as StudentRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StudentRegistry>): Promise<StudentRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentRegistryService(supabase);
      return await service.updateStudentRegistry(schoolId, id, data);
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
      const service = new EduOSStudentRegistryService(supabase);
      await service.deleteStudentRegistry(schoolId, id);
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
