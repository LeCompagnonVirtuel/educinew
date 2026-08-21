'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIDeprecationService } from '../services/api-deprecation.service';
import { createClient } from '@/lib/supabase/client';
import type { APIDeprecation } from '@educi/types';

export const useEntAPIDeprecationList = (schoolId: string) => {
  const [items, setItems] = useState<APIDeprecation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIDeprecationService(supabase);
      const data = await service.listAPIDeprecations(schoolId);
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
