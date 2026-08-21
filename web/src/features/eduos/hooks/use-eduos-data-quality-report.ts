'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataQualityReportService } from '../services/eduos-data-quality-report.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQualityReport } from '@educi/types';

export const useEduOSDataQualityReportList = (schoolId: string) => {
  const [items, setItems] = useState<DataQualityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataQualityReportService(supabase);
      const data = await service.listDataQualityReports(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};