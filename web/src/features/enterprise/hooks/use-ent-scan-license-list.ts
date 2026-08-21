'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanLicenseService } from '../services/scan-license.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanLicense } from '@educi/types';

export const useEntScanLicenseList = (schoolId: string) => {
  const [items, setItems] = useState<ScanLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanLicenseService(supabase);
      const data = await service.listScanLicenses(schoolId);
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
