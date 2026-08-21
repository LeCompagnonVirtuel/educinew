'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationAnalyticsService } from '../services/eduos-automation-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationAnalytics } from '@educi/types';

export const useEduOSAutomationAnalyticsList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationAnalyticsService(supabase);
      const data = await service.listAutomationAnalytics(schoolId);
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