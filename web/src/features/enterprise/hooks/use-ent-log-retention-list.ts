'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogRetentionService } from '../services/log-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { LogRetention } from '@educi/types';

export const useEntLogRetentionList = (schoolId: string) => {
  const [items, setItems] = useState<LogRetention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRetentionService(supabase);
      const data = await service.listLogRetentions(schoolId);
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
