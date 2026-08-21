'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertInhibitionService } from '../services/alert-inhibition.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertInhibition } from '@educi/types';

export const useEntAlertInhibitionList = (schoolId: string) => {
  const [items, setItems] = useState<AlertInhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertInhibitionService(supabase);
      const data = await service.listAlertInhibitions(schoolId);
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
