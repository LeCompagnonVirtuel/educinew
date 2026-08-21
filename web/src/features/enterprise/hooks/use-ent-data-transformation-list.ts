'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataTransformationService } from '../services/data-transformation.service';
import { createClient } from '@/lib/supabase/client';
import type { DataTransformation } from '@educi/types';

export const useEntDataTransformationList = (schoolId: string) => {
  const [items, setItems] = useState<DataTransformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataTransformationService(supabase);
      const data = await service.listDataTransformations(schoolId);
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
