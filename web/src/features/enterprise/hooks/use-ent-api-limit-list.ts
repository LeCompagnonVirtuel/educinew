'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPILimitService } from '../services/api-limit.service';
import { createClient } from '@/lib/supabase/client';
import type { APILimit } from '@educi/types';

export const useEntAPILimitList = (schoolId: string) => {
  const [items, setItems] = useState<APILimit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPILimitService(supabase);
      const data = await service.listAPILimits(schoolId);
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
