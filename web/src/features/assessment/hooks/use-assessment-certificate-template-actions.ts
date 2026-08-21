'use client';

import { useState, useCallback } from 'react';
import { AssessmentCertificateTemplateService } from '../services/assessment-certificate-template.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateTemplate, CertificateTemplateCreate } from '@educi/types';

export const useAssessmentCertificateTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CertificateTemplateCreate): Promise<CertificateTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateTemplateService(supabase);
      return await service.createCertificateTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CertificateTemplateCreate>): Promise<CertificateTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateTemplateService(supabase);
      return await service.updateCertificateTemplate(schoolId, id, data);
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
      const service = new AssessmentCertificateTemplateService(supabase);
      await service.deleteCertificateTemplate(schoolId, id);
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