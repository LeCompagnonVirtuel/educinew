'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIDocService } from '../services/api-doc.service';
import { createClient } from '@/lib/supabase/client';
import type { APIDoc } from '@educi/types';

export const useEntAPIDocList = (schoolId: string) => {
  const [items, setItems] = useState<APIDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIDocService(supabase);
      const data = await service.listAPIDocs(schoolId);
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
