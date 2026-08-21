'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPerformanceAlertService } from '../services/performance-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceAlert } from '@educi/types';

export const useEntPerformanceAlertList = (schoolId: string) => {
  const [items, setItems] = useState<PerformanceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceAlertService(supabase);
      const data = await service.listPerformanceAlerts(schoolId);
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
