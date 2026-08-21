'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformForecastService } from '../services/platform-forecast.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformForecast } from '@educi/types';

export const useEntPlatformForecastList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformForecastService(supabase);
      const data = await service.listPlatformForecasts(schoolId);
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
