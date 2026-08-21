'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanContainerService } from '../services/scan-container.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanContainer } from '@educi/types';

export const useEntScanContainerList = (schoolId: string) => {
  const [items, setItems] = useState<ScanContainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanContainerService(supabase);
      const data = await service.listScanContainers(schoolId);
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
