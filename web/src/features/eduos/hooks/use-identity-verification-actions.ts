'use client';

import { useState, useCallback } from 'react';
import { EduOSIdentityVerificationService } from '../services/eduos-identity-verification.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityVerification } from '@educi/types';

export const useEduOSIdentityVerificationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<IdentityVerification>): Promise<IdentityVerification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityVerificationService(supabase);
      return await service.createIdentityVerification(schoolId, data as IdentityVerification);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IdentityVerification>): Promise<IdentityVerification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityVerificationService(supabase);
      return await service.updateIdentityVerification(schoolId, id, data);
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
      const service = new EduOSIdentityVerificationService(supabase);
      await service.deleteIdentityVerification(schoolId, id);
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
