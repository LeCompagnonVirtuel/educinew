'use client';

import { useState, useCallback } from 'react';
import { EduOSNationalEducationIdentityService } from '../services/eduos-national-education-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { NationalEducationIdentity } from '@educi/types';

export const useEduOSNationalEducationIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalEducationIdentityService(supabase);
      return await service.createNationalEducationIdentity(schoolId, data as NationalEducationIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalEducationIdentityService(supabase);
      return await service.updateNationalEducationIdentity(schoolId, id, data);
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
      const service = new EduOSNationalEducationIdentityService(supabase);
      await service.deleteNationalEducationIdentity(schoolId, id);
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
