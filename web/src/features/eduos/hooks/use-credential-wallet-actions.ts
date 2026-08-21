'use client';

import { useState, useCallback } from 'react';
import { EduOSCredentialWalletService } from '../services/eduos-credential-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { CredentialWallet } from '@educi/types';

export const useEduOSCredentialWalletActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CredentialWallet>): Promise<CredentialWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialWalletService(supabase);
      return await service.createCredentialWallet(schoolId, data as CredentialWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CredentialWallet>): Promise<CredentialWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialWalletService(supabase);
      return await service.updateCredentialWallet(schoolId, id, data);
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
      const service = new EduOSCredentialWalletService(supabase);
      await service.deleteCredentialWallet(schoolId, id);
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
