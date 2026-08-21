'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanTrendService } from '../services/scan-trend.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanTrend } from '@educi/types';

export const useEntScanTrendList = (schoolId: string) => {
  const [items, setItems] = useState<ScanTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanTrendService(supabase);
      const data = await service.listScanTrends(schoolId);
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
