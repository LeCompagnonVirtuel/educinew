'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformDashboardService } from '../services/platform-dashboard.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformDashboard } from '@educi/types';

export const useEntPlatformDashboardList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformDashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformDashboardService(supabase);
      const data = await service.listPlatformDashboards(schoolId);
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
