'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertRouteService } from '../services/alert-route.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertRoute } from '@educi/types';

export const useEntAlertRouteList = (schoolId: string) => {
  const [items, setItems] = useState<AlertRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertRouteService(supabase);
      const data = await service.listAlertRoutes(schoolId);
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
