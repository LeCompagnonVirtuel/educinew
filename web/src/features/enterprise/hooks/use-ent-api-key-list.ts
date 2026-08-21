'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIKeyService } from '../services/api-key.service';
import { createClient } from '@/lib/supabase/client';
import type { APIKey } from '@educi/types';

export const useEntAPIKeyList = (schoolId: string) => {
  const [items, setItems] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIKeyService(supabase);
      const data = await service.listAPIKeys(schoolId);
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
