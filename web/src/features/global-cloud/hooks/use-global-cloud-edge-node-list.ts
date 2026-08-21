'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudEdgeNodeService } from '../services/global-cloud-edge-node.service';
import { createClient } from '@/lib/supabase/client';
import type { EdgeNode } from '@educi/types';

export const useGlobalCloudEdgeNodeList = (schoolId: string) => {
  const [items, setItems] = useState<EdgeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEdgeNodeService(supabase);
      const data = await service.list(schoolId);
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