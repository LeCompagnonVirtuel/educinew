'use client';

import { useState, useCallback } from 'react';
import { EduOSSchoolPolicyService } from '../services/eduos-school-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { SchoolPolicy } from '@educi/types';

export const useEduOSSchoolPolicyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SchoolPolicy>): Promise<SchoolPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolPolicyService(supabase);
      return await service.createSchoolPolicy(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SchoolPolicy>): Promise<SchoolPolicy | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSchoolPolicyService(supabase);
      return await service.updateSchoolPolicy(schoolId, id, data);
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
      const service = new EduOSSchoolPolicyService(supabase);
      await service.deleteSchoolPolicy(schoolId, id);
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
