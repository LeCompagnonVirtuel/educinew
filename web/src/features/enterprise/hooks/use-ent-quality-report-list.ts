'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntQualityReportService } from '../services/quality-report.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityReport } from '@educi/types';

export const useEntQualityReportList = (schoolId: string) => {
  const [items, setItems] = useState<QualityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityReportService(supabase);
      const data = await service.listQualityReports(schoolId);
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
