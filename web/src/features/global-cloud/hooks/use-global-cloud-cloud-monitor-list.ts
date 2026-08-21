'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudMonitorService } from '../services/global-cloud-cloud-monitor.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudMonitor } from '@educi/types';

export const useGlobalCloudCloudMonitorList = (schoolId: string) => {
  const [items, setItems] = useState<CloudMonitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudMonitorService(supabase);
      const data = await service.list(schoolId);
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