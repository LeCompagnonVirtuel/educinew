'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCertificateRegistryEntryService } from '../services/eduos-certificate-registry-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateRegistryEntry } from '@educi/types';

export const useEduOSCertificateRegistryEntryList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateRegistryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateRegistryEntryService(supabase);
      const data = await service.listCertificateRegistryEntrys(schoolId);
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
