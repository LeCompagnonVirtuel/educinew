'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertPolicyService } from '../services/alert-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertPolicy } from '@educi/types';

export const useEntAlertPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<AlertPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertPolicyService(supabase);
      const data = await service.listAlertPolicys(schoolId);
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
