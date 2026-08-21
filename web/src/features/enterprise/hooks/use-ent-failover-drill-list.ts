'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverDrillService } from '../services/failover-drill.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverDrill } from '@educi/types';

export const useEntFailoverDrillList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverDrill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverDrillService(supabase);
      const data = await service.listFailoverDrills(schoolId);
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
