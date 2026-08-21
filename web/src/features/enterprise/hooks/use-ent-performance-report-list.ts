'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPerformanceReportService } from '../services/performance-report.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceReport } from '@educi/types';

export const useEntPerformanceReportList = (schoolId: string) => {
  const [items, setItems] = useState<PerformanceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceReportService(supabase);
      const data = await service.listPerformanceReports(schoolId);
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
