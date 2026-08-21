'use client';

import { useState, useCallback } from 'react';
import { EduOSCertificateLedgerService } from '../services/eduos-certificate-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateLedger } from '@educi/types';

export const useEduOSCertificateLedgerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CertificateLedger>): Promise<CertificateLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateLedgerService(supabase);
      return await service.createCertificateLedger(schoolId, data as CertificateLedger);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CertificateLedger>): Promise<CertificateLedger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateLedgerService(supabase);
      return await service.updateCertificateLedger(schoolId, id, data);
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
      const service = new EduOSCertificateLedgerService(supabase);
      await service.deleteCertificateLedger(schoolId, id);
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
