'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformCorrelationService } from '../services/platform-correlation.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformCorrelation } from '@educi/types';

export const useEntPlatformCorrelationList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformCorrelation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCorrelationService(supabase);
      const data = await service.listPlatformCorrelations(schoolId);
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
