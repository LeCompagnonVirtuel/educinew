'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDisasterRecoveryTestService } from '../services/global-cloud-disaster-recovery-test.service';
import { createClient } from '@/lib/supabase/client';
import type { DisasterRecoveryTest } from '@educi/types';

export const useGlobalCloudDisasterRecoveryTestList = (schoolId: string) => {
  const [items, setItems] = useState<DisasterRecoveryTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDisasterRecoveryTestService(supabase);
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