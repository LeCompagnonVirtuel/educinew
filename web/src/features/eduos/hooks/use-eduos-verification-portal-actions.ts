'use client';

import { useState, useCallback } from 'react';
import { EduOSVerificationPortalService } from '../services/eduos-verification-portal.service';
import { createClient } from '@/lib/supabase/client';
import type { VerificationPortal } from '@educi/types';

export const useEduOSVerificationPortalActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<VerificationPortal>): Promise<VerificationPortal | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVerificationPortalService(supabase);
      return await service.createVerificationPortal(schoolId, data as VerificationPortal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<VerificationPortal>): Promise<VerificationPortal | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVerificationPortalService(supabase);
      return await service.updateVerificationPortal(schoolId, id, data);
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
      const service = new EduOSVerificationPortalService(supabase);
      await service.deleteVerificationPortal(schoolId, id);
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
