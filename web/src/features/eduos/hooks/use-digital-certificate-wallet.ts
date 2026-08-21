'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDigitalCertificateWalletService } from '../services/eduos-digital-certificate-wallet.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalCertificateWallet } from '@educi/types';

export const useEduOSDigitalCertificateWalletList = (schoolId: string) => {
  const [items, setItems] = useState<DigitalCertificateWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDigitalCertificateWalletService(supabase);
      const data = await service.listDigitalCertificateWallets(schoolId);
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
