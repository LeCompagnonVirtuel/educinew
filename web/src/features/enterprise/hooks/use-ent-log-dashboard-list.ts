'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogDashboardService } from '../services/log-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { LogDashboard } from '@educi/types';

export const useEntLogDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<LogDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogDashboardService(supabase);
      const data = await service.listLogDashboards(schoolId);
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
