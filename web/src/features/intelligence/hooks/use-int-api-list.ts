'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntApiService } from '../services/int-api.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceAPI } from '@educi/types';

export const useIntApiList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntApiService(supabase);
      const data = await service.listAPIs(schoolId);
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