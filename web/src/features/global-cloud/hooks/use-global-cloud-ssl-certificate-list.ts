'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSSLCertificateService } from '../services/global-cloud-ssl-certificate.service';
import { createClient } from '@/lib/supabase/client';
import type { SSLCertificate } from '@educi/types';

export const useGlobalCloudSSLCertificateList = (schoolId: string) => {
  const [items, setItems] = useState<SSLCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSSLCertificateService(supabase);
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