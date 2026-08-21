'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntRetryPolicyService } from '../services/retry-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { RetryPolicy } from '@educi/types';

export const useEntRetryPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<RetryPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRetryPolicyService(supabase);
      const data = await service.listRetryPolicys(schoolId);
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
