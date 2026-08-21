'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntQualityPolicyService } from '../services/quality-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityPolicy } from '@educi/types';

export const useEntQualityPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<QualityPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityPolicyService(supabase);
      const data = await service.listQualityPolicys(schoolId);
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
