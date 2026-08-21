'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogFormatterService } from '../services/log-formatter.service';
import { createClient } from '@/lib/supabase/client';
import type { LogFormatter } from '@educi/types';

export const useEntLogFormatterList = (schoolId: string) => {
  const [items, setItems] = useState<LogFormatter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogFormatterService(supabase);
      const data = await service.listLogFormatters(schoolId);
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
