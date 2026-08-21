'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataCatalogService } from '../services/eduos-data-catalog.service';
import { createClient } from '@/lib/supabase/client';
import type { DataCatalog } from '@educi/types';

export const useEduOSDataCatalogList = (schoolId: string) => {
  const [items, setItems] = useState<DataCatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataCatalogService(supabase);
      const data = await service.listDataCatalogs(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};