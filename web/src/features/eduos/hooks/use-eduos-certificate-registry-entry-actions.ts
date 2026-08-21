'use client';

import { useState, useCallback } from 'react';
import { EduOSCertificateRegistryEntryService } from '../services/eduos-certificate-registry-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateRegistryEntry } from '@educi/types';

export const useEduOSCertificateRegistryEntryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateRegistryEntryService(supabase);
      return await service.createCertificateRegistryEntry(schoolId, data as CertificateRegistryEntry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateRegistryEntryService(supabase);
      return await service.updateCertificateRegistryEntry(schoolId, id, data);
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
      const service = new EduOSCertificateRegistryEntryService(supabase);
      await service.deleteCertificateRegistryEntry(schoolId, id);
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
