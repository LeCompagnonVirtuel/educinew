'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformKPIService } from '../services/platform-kpi.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformKPI } from '@educi/types';

export const useEntPlatformKPIList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformKPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformKPIService(supabase);
      const data = await service.listPlatformKPIs(schoolId);
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
