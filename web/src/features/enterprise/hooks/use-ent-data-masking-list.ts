'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataMaskingService } from '../services/data-masking.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMasking } from '@educi/types';

export const useEntDataMaskingList = (schoolId: string) => {
  const [items, setItems] = useState<DataMasking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMaskingService(supabase);
      const data = await service.listDataMaskings(schoolId);
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
