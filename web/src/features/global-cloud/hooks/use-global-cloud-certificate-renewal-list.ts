'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCertificateRenewalService } from '../services/global-cloud-certificate-renewal.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateRenewal } from '@educi/types';

export const useGlobalCloudCertificateRenewalList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateRenewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCertificateRenewalService(supabase);
      const data = await service.list(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};