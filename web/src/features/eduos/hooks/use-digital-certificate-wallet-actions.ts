'use client';

import { useState, useCallback } from 'react';
import { EduOSDigitalCertificateWalletService } from '../services/eduos-digital-certificate-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalCertificateWallet } from '@educi/types';

export const useEduOSDigitalCertificateWalletActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalCertificateWalletService(supabase);
      return await service.createDigitalCertificateWallet(schoolId, data as DigitalCertificateWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalCertificateWalletService(supabase);
      return await service.updateDigitalCertificateWallet(schoolId, id, data);
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
      const service = new EduOSDigitalCertificateWalletService(supabase);
      await service.deleteDigitalCertificateWallet(schoolId, id);
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
