'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveBurnoutService } from '../services/adaptive-burnout.service';
import { createClient } from '@/lib/supabase/client';
import type { BurnoutDetection } from '@educi/types';

export const useAdaptiveBurnoutList = (schoolId: string) => {
  const [items, setItems] = useState<BurnoutDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBurnoutService(supabase);
      const data = await service.listBurnoutDetections(schoolId);
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
