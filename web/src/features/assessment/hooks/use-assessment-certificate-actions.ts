'use client';

import { useState, useCallback } from 'react';
import { AssessmentCertificateService } from '../services/assessment-certificate.service';
import { createClient } from '@/lib/supabase/client';
import type { Certificate, CertificateCreate } from '@educi/types';

export const useAssessmentCertificateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CertificateCreate): Promise<Certificate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateService(supabase);
      return await service.createCertificate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CertificateCreate>): Promise<Certificate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateService(supabase);
      return await service.updateCertificate(schoolId, id, data);
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
      const service = new AssessmentCertificateService(supabase);
      await service.deleteCertificate(schoolId, id);
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