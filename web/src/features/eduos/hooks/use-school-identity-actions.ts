'use client';

import { useState, useCallback } from 'react';
import { EduOSSchoolIdentityService } from '../services/eduos-school-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolIdentity } from '@educi/types';

export const useEduOSSchoolIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SchoolIdentity>): Promise<SchoolIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolIdentityService(supabase);
      return await service.createSchoolIdentity(schoolId, data as SchoolIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SchoolIdentity>): Promise<SchoolIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolIdentityService(supabase);
      return await service.updateSchoolIdentity(schoolId, id, data);
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
      const service = new EduOSSchoolIdentityService(supabase);
      await service.deleteSchoolIdentity(schoolId, id);
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
