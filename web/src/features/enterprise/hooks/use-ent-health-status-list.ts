'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthStatusService } from '../services/health-status.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthStatus } from '@educi/types';

export const useEntHealthStatusList = (schoolId: string) => {
  const [items, setItems] = useState<HealthStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthStatusService(supabase);
      const data = await service.listHealthStatuss(schoolId);
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
