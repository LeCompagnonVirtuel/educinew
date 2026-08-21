'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntAnalyticsReportService } from '../services/int-analytics-report.service';
import { createClient } from '@/lib/supabase/client';
import type { AnalyticsReport } from '@educi/types';

export const useIntAnalyticsReportList = (schoolId: string) => {
  const [items, setItems] = useState<AnalyticsReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAnalyticsReportService(supabase);
      const data = await service.listAnalyticsReports(schoolId);
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