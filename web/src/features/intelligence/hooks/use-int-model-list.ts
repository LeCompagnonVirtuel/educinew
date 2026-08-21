'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntModelService } from '../services/int-model.service';
import { createClient } from '@/lib/supabase/client';
import type { AIModel } from '@educi/types';

export const useIntModelList = (schoolId: string) => {
  const [items, setItems] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntModelService(supabase);
      const data = await service.listModels(schoolId);
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
