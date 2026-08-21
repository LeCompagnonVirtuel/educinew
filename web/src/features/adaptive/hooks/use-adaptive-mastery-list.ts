'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveMasteryService } from '../services/adaptive-mastery.service';
import { createClient } from '@/lib/supabase/client';
import type { MasteryTracking } from '@educi/types';

export const useAdaptiveMasteryList = (schoolId: string) => {
  const [items, setItems] = useState<MasteryTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryService(supabase);
      const data = await service.listMasteryTrackings(schoolId);
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
