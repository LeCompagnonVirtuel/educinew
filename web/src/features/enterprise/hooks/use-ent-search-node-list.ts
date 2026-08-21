'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchNodeService } from '../services/search-node.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchNode } from '@educi/types';

export const useEntSearchNodeList = (schoolId: string) => {
  const [items, setItems] = useState<SearchNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchNodeService(supabase);
      const data = await service.listSearchNodes(schoolId);
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
