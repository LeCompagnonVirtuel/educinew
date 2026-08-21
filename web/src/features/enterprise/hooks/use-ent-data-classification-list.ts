'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataClassificationService } from '../services/data-classification.service';
import { createClient } from '@/lib/supabase/client';
import type { DataClassification } from '@educi/types';

export const useEntDataClassificationList = (schoolId: string) => {
  const [items, setItems] = useState<DataClassification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataClassificationService(supabase);
      const data = await service.listDataClassifications(schoolId);
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
