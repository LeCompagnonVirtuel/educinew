'use client';

import { useState, useCallback } from 'react';
import { EduOSStudentIdentityService } from '../services/eduos-student-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentIdentity } from '@educi/types';

export const useEduOSStudentIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<StudentIdentity>): Promise<StudentIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentIdentityService(supabase);
      return await service.createStudentIdentity(schoolId, data as StudentIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StudentIdentity>): Promise<StudentIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentIdentityService(supabase);
      return await service.updateStudentIdentity(schoolId, id, data);
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
      const service = new EduOSStudentIdentityService(supabase);
      await service.deleteStudentIdentity(schoolId, id);
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
