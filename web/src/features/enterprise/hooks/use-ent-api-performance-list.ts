'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIPerformanceService } from '../services/api-performance.service';
import { createClient } from '@/lib/supabase/client';
import type { APIPerformance } from '@educi/types';

export const useEntAPIPerformanceList = (schoolId: string) => {
  const [items, setItems] = useState<APIPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIPerformanceService(supabase);
      const data = await service.listAPIPerformances(schoolId);
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
