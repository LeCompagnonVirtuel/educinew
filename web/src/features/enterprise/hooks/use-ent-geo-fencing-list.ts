'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntGeoFencingService } from '../services/geo-fencing.service';
import { createClient } from '@/lib/supabase/client';
import type { GeoFencing } from '@educi/types';

export const useEntGeoFencingList = (schoolId: string) => {
  const [items, setItems] = useState<GeoFencing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGeoFencingService(supabase);
      const data = await service.listGeoFencings(schoolId);
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
