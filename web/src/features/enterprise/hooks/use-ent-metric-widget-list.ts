'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntMetricWidgetService } from '../services/metric-widget.service';
import { createClient } from '@/lib/supabase/client';
import type { MetricWidget } from '@educi/types';

export const useEntMetricWidgetList = (schoolId: string) => {
  const [items, setItems] = useState<MetricWidget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntMetricWidgetService(supabase);
      const data = await service.listMetricWidgets(schoolId);
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
