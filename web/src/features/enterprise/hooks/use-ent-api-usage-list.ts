'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIUsageService } from '../services/api-usage.service';
import { createClient } from '@/lib/supabase/client';
import type { APIUsage } from '@educi/types';

export const useEntAPIUsageList = (schoolId: string) => {
  const [items, setItems] = useState<APIUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIUsageService(supabase);
      const data = await service.listAPIUsages(schoolId);
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
