'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanRegistryService } from '../services/scan-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanRegistry } from '@educi/types';

export const useEntScanRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<ScanRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRegistryService(supabase);
      const data = await service.listScanRegistrys(schoolId);
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
