'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataGovernanceService } from '../services/data-governance.service';
import { createClient } from '@/lib/supabase/client';
import type { DataGovernance } from '@educi/types';

export const useEntDataGovernanceList = (schoolId: string) => {
  const [items, setItems] = useState<DataGovernance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataGovernanceService(supabase);
      const data = await service.listDataGovernances(schoolId);
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
