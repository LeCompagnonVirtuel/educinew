'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveCompetencyDashboardService } from '../services/adaptive-competency-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyDashboard } from '@educi/types';

export const useAdaptiveCompetencyDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<CompetencyDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyDashboardService(supabase);
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
