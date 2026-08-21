'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSecurityPolicyService } from '../services/security-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityPolicy } from '@educi/types';

export const useEntSecurityPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<SecurityPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityPolicyService(supabase);
      const data = await service.listSecurityPolicys(schoolId);
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
