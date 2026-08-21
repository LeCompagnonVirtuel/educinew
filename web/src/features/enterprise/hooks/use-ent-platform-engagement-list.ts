'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformEngagementService } from '../services/platform-engagement.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformEngagement } from '@educi/types';

export const useEntPlatformEngagementList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformEngagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformEngagementService(supabase);
      const data = await service.listPlatformEngagements(schoolId);
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
