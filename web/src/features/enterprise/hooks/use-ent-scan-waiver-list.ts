'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanWaiverService } from '../services/scan-waiver.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanWaiver } from '@educi/types';

export const useEntScanWaiverList = (schoolId: string) => {
  const [items, setItems] = useState<ScanWaiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanWaiverService(supabase);
      const data = await service.listScanWaivers(schoolId);
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
