'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentCertificateTemplateService } from '../services/assessment-certificate-template.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateTemplate } from '@educi/types';

export const useAssessmentCertificateTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateTemplateService(supabase);
      const data = await service.listCertificateTemplates(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};