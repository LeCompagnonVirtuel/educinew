'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCertificateLedgerService } from '../services/eduos-certificate-ledger.service';
import { createClient } from '@/lib/supabase/client';
import type { CertificateLedger } from '@educi/types';

export const useEduOSCertificateLedgerList = (schoolId: string) => {
  const [items, setItems] = useState<CertificateLedger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCertificateLedgerService(supabase);
      const data = await service.listCertificateLedgers(schoolId);
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
