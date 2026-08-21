'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntEarlyWarningService } from '../services/int-early-warning.service';
import { createClient } from '@/lib/supabase/client';
import type { EarlyWarning } from '@educi/types';

export const useIntEarlyWarningList = (schoolId: string) => {
  const [items, setItems] = useState<EarlyWarning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntEarlyWarningService(supabase);
      const data = await service.listEarlyWarnings(schoolId);
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
