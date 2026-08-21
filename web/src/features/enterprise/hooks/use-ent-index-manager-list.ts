'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexManagerService } from '../services/index-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexManager } from '@educi/types';

export const useEntIndexManagerList = (schoolId: string) => {
  const [items, setItems] = useState<IndexManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexManagerService(supabase);
      const data = await service.listIndexManagers(schoolId);
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
