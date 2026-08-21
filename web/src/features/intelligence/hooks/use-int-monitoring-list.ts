'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntMonitoringService } from '../services/int-monitoring.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceMonitoring } from '@educi/types';

export const useIntMonitoringList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceMonitoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntMonitoringService(supabase);
      const data = await service.listMonitorings(schoolId);
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