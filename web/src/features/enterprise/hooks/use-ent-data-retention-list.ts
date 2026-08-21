'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataRetentionService } from '../services/data-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { DataRetention } from '@educi/types';

export const useEntDataRetentionList = (schoolId: string) => {
  const [items, setItems] = useState<DataRetention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRetentionService(supabase);
      const data = await service.listDataRetentions(schoolId);
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
