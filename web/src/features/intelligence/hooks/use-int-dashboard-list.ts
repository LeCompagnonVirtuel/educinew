'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntDashboardService } from '../services/int-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceDashboard } from '@educi/types';

export const useIntDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDashboardService(supabase);
      const data = await service.listDashboards(schoolId);
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
