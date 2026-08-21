'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformAdoptionService } from '../services/platform-adoption.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformAdoption } from '@educi/types';

export const useEntPlatformAdoptionList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformAdoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformAdoptionService(supabase);
      const data = await service.listPlatformAdoptions(schoolId);
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
