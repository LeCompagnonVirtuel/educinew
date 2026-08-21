'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPITestingService } from '../services/api-testing.service';
import { createClient } from '@/lib/supabase/client';
import type { APITesting } from '@educi/types';

export const useEntAPITestingList = (schoolId: string) => {
  const [items, setItems] = useState<APITesting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPITestingService(supabase);
      const data = await service.listAPITestings(schoolId);
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
