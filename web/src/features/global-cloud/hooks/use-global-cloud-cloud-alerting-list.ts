'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudAlertingService } from '../services/global-cloud-cloud-alerting.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudAlerting } from '@educi/types';

export const useGlobalCloudCloudAlertingList = (schoolId: string) => {
  const [items, setItems] = useState<CloudAlerting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudAlertingService(supabase);
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