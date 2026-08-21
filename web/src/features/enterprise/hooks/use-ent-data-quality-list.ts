'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataQualityService } from '../services/data-quality.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQuality } from '@educi/types';

export const useEntDataQualityList = (schoolId: string) => {
  const [items, setItems] = useState<DataQuality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataQualityService(supabase);
      const data = await service.listDataQualitys(schoolId);
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
