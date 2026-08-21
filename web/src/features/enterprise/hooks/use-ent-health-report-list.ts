'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthReportService } from '../services/health-report.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthReport } from '@educi/types';

export const useEntHealthReportList = (schoolId: string) => {
  const [items, setItems] = useState<HealthReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthReportService(supabase);
      const data = await service.listHealthReports(schoolId);
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
