'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveBadgeService } from '../services/adaptive-badge.service';
import { createClient } from '@/lib/supabase/client';
import type { Badge } from '@educi/types';

export const useAdaptiveBadgeList = (schoolId: string) => {
  const [items, setItems] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBadgeService(supabase);
      const data = await service.listBadges(schoolId);
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
