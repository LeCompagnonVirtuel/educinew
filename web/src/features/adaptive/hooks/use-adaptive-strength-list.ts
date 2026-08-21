'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveStrengthService } from '../services/adaptive-strength.service';
import { createClient } from '@/lib/supabase/client';
import type { StrengthDetection } from '@educi/types';

export const useAdaptiveStrengthList = (schoolId: string) => {
  const [items, setItems] = useState<StrengthDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveStrengthService(supabase);
      const data = await service.listStrengthDetections(schoolId);
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
