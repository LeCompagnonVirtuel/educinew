'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIntegrationAnalyticsService } from '../services/eduos-integration-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationAnalytics } from '@educi/types';

export const useEduOSIntegrationAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<IntegrationAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationAnalyticsService(supabase);
      const data = await service.listIntegrationAnalytics(schoolId);
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