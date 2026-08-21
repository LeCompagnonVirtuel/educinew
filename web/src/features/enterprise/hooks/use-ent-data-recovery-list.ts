'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataRecoveryService } from '../services/data-recovery.service';
import { createClient } from '@/lib/supabase/client';
import type { DataRecovery } from '@educi/types';

export const useEntDataRecoveryList = (schoolId: string) => {
  const [items, setItems] = useState<DataRecovery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataRecoveryService(supabase);
      const data = await service.listDataRecoverys(schoolId);
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
