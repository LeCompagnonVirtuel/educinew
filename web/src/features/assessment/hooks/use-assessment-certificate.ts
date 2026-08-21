'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentCertificateService } from '../services/assessment-certificate.service';
import { createClient } from '@/lib/supabase/client';
import type { Certificate } from '@educi/types';

export const useAssessmentCertificateList = (schoolId: string) => {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCertificateService(supabase);
      const data = await service.listCertificates(schoolId);
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