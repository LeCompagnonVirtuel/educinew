'use client';

import { useState, useCallback } from 'react';
import { EduOSDigitalWalletIdentityService } from '../services/eduos-digital-wallet-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalWalletIdentity } from '@educi/types';

export const useEduOSDigitalWalletIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalWalletIdentityService(supabase);
      return await service.createDigitalWalletIdentity(schoolId, data as DigitalWalletIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalWalletIdentityService(supabase);
      return await service.updateDigitalWalletIdentity(schoolId, id, data);
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
      const service = new EduOSDigitalWalletIdentityService(supabase);
      await service.deleteDigitalWalletIdentity(schoolId, id);
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
