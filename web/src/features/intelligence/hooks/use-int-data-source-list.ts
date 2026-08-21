'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntDataSourceService } from '../services/int-data-source.service';
import { createClient } from '@/lib/supabase/client';
import type { DataSource } from '@educi/types';

export const useIntDataSourceList = (schoolId: string) => {
  const [items, setItems] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDataSourceService(supabase);
      const data = await service.listDataSources(schoolId);
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
