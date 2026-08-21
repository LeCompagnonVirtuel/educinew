'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanPolicyService } from '../services/scan-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanPolicy } from '@educi/types';

export const useEntScanPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<ScanPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanPolicyService(supabase);
      const data = await service.listScanPolicys(schoolId);
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
