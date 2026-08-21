'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataLineageService } from '../services/eduos-data-lineage.service';
import { createClient } from '@/lib/supabase/client';
import type { DataLineage } from '@educi/types';

export const useEduOSDataLineageList = (schoolId: string) => {
  const [items, setItems] = useState<DataLineage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataLineageService(supabase);
      const data = await service.listDataLineages(schoolId);
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