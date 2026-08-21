'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntKPIService } from '../services/int-kpi.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceKPI } from '@educi/types';

export const useIntKPIList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceKPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKPIService(supabase);
      const data = await service.listKPIs(schoolId);
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
