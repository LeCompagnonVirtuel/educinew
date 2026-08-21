'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCertificateAuditService } from '../services/global-cloud-certificate-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateAudit } from '@educi/types';

export const useGlobalCloudCertificateAuditList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCertificateAuditService(supabase);
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