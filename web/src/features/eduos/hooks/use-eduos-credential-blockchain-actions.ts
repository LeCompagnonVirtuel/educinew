'use client';

import { useState, useCallback } from 'react';
import { EduOSCredentialBlockchainService } from '../services/eduos-credential-blockchain.service';
import { createClient } from '@/lib/supabase/client';
import type { CredentialBlockchain } from '@educi/types';

export const useEduOSCredentialBlockchainActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialBlockchainService(supabase);
      return await service.createCredentialBlockchain(schoolId, data as CredentialBlockchain);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCredentialBlockchainService(supabase);
      return await service.updateCredentialBlockchain(schoolId, id, data);
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
      const service = new EduOSCredentialBlockchainService(supabase);
      await service.deleteCredentialBlockchain(schoolId, id);
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
