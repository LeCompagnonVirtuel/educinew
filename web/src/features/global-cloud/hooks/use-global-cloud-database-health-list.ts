'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDatabaseHealthService } from '../services/global-cloud-database-health.service';
import { createClient } from '@/lib/supabase/client';
import type { DatabaseHealth } from '@educi/types';

export const useGlobalCloudDatabaseHealthList = (schoolId: string) => {
  const [items, setItems] = useState<DatabaseHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDatabaseHealthService(supabase);
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