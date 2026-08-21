'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveMasteryDashboardService } from '../services/adaptive-mastery-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { MasteryDashboard } from '@educi/types';

export const useAdaptiveMasteryDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<MasteryDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryDashboardService(supabase);
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
