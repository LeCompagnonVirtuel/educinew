'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanResultService } from '../services/scan-result.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanResult } from '@educi/types';

export const useEntScanResultList = (schoolId: string) => {
  const [items, setItems] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanResultService(supabase);
      const data = await service.listScanResults(schoolId);
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
