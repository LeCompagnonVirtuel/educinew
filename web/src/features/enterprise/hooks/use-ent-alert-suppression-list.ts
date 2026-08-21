'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertSuppressionService } from '../services/alert-suppression.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertSuppression } from '@educi/types';

export const useEntAlertSuppressionList = (schoolId: string) => {
  const [items, setItems] = useState<AlertSuppression[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertSuppressionService(supabase);
      const data = await service.listAlertSuppressions(schoolId);
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
