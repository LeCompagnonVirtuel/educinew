'use client';

import { useState, useCallback } from 'react';
import { EduOSEducationWalletService } from '../services/eduos-education-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { EducationWallet } from '@educi/types';

export const useEduOSEducationWalletActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<EducationWallet>): Promise<EducationWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEducationWalletService(supabase);
      return await service.createEducationWallet(schoolId, data as EducationWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EducationWallet>): Promise<EducationWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEducationWalletService(supabase);
      return await service.updateEducationWallet(schoolId, id, data);
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
      const service = new EduOSEducationWalletService(supabase);
      await service.deleteEducationWallet(schoolId, id);
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
