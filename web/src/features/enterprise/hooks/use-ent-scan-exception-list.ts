'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanExceptionService } from '../services/scan-exception.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanException } from '@educi/types';

export const useEntScanExceptionList = (schoolId: string) => {
  const [items, setItems] = useState<ScanException[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanExceptionService(supabase);
      const data = await service.listScanExceptions(schoolId);
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
