'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanBaselineService } from '../services/scan-baseline.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanBaseline } from '@educi/types';

export const useEntScanBaselineList = (schoolId: string) => {
  const [items, setItems] = useState<ScanBaseline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanBaselineService(supabase);
      const data = await service.listScanBaselines(schoolId);
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
