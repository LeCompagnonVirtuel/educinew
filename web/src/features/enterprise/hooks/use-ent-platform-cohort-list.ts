'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformCohortService } from '../services/platform-cohort.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformCohort } from '@educi/types';

export const useEntPlatformCohortList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformCohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformCohortService(supabase);
      const data = await service.listPlatformCohorts(schoolId);
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
