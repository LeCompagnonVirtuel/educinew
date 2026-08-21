'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformAnomalyService } from '../services/platform-anomaly.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAnomaly } from '@educi/types';

export const useEntPlatformAnomalyList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformAnomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAnomalyService(supabase);
      const data = await service.listPlatformAnomalys(schoolId);
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
