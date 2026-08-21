'use client';

import { useState, useCallback } from 'react';
import { EduOSBiometricIdentityService } from '../services/eduos-biometric-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { BiometricIdentity } from '@educi/types';

export const useEduOSBiometricIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BiometricIdentity>): Promise<BiometricIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBiometricIdentityService(supabase);
      return await service.createBiometricIdentity(schoolId, data as BiometricIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BiometricIdentity>): Promise<BiometricIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBiometricIdentityService(supabase);
      return await service.updateBiometricIdentity(schoolId, id, data);
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
      const service = new EduOSBiometricIdentityService(supabase);
      await service.deleteBiometricIdentity(schoolId, id);
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
