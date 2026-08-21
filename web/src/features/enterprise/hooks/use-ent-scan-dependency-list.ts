'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanDependencyService } from '../services/scan-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanDependency } from '@educi/types';

export const useEntScanDependencyList = (schoolId: string) => {
  const [items, setItems] = useState<ScanDependency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanDependencyService(supabase);
      const data = await service.listScanDependencys(schoolId);
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
