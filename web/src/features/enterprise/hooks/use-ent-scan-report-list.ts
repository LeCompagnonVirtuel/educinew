'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanReportService } from '../services/scan-report.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanReport } from '@educi/types';

export const useEntScanReportList = (schoolId: string) => {
  const [items, setItems] = useState<ScanReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanReportService(supabase);
      const data = await service.listScanReports(schoolId);
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
