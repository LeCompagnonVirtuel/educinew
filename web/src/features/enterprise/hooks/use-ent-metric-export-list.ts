'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntMetricExportService } from '../services/metric-export.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricExport } from '@educi/types';

export const useEntMetricExportList = (schoolId: string) => {
  const [items, setItems] = useState<MetricExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricExportService(supabase);
      const data = await service.listMetricExports(schoolId);
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
