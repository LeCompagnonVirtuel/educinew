'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanTargetService } from '../services/scan-target.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanTarget } from '@educi/types';

export const useEntScanTargetList = (schoolId: string) => {
  const [items, setItems] = useState<ScanTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTargetService(supabase);
      const data = await service.listScanTargets(schoolId);
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
