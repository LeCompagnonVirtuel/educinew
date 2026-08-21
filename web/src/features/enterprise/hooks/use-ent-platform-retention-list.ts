'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformRetentionService } from '../services/platform-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformRetention } from '@educi/types';

export const useEntPlatformRetentionList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformRetention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRetentionService(supabase);
      const data = await service.listPlatformRetentions(schoolId);
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
