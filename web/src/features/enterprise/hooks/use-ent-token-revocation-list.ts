'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTokenRevocationService } from '../services/token-revocation.service';
import { createClient } from '@/lib/supabase/client';
import type { TokenRevocation } from '@educi/types';

export const useEntTokenRevocationList = (schoolId: string) => {
  const [items, setItems] = useState<TokenRevocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTokenRevocationService(supabase);
      const data = await service.listTokenRevocations(schoolId);
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
