'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthHistoryService } from '../services/health-history.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthHistory } from '@educi/types';

export const useEntHealthHistoryList = (schoolId: string) => {
  const [items, setItems] = useState<HealthHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthHistoryService(supabase);
      const data = await service.listHealthHistorys(schoolId);
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
