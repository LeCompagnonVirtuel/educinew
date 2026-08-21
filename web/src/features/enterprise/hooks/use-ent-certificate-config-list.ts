'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCertificateConfigService } from '../services/certificate-config.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateConfig } from '@educi/types';

export const useEntCertificateConfigList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCertificateConfigService(supabase);
      const data = await service.listCertificateConfigs(schoolId);
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
