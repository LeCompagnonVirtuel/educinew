'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDatabaseRouterService } from '../services/global-cloud-database-router.service';
import { createClient } from '@/lib/supabase/client';
import type { DatabaseRouter } from '@educi/types';

export const useGlobalCloudDatabaseRouterList = (schoolId: string) => {
  const [items, setItems] = useState<DatabaseRouter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDatabaseRouterService(supabase);
      const data = await service.list(schoolId);
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