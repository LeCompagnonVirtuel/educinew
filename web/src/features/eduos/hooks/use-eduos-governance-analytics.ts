'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSGovernanceAnalyticsService } from '../services/eduos-governance-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernanceAnalytics } from '@educi/types';

export const useEduOSGovernanceAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<GovernanceAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernanceAnalyticsService(supabase);
      const data = await service.listGovernanceAnalytics(schoolId);
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
