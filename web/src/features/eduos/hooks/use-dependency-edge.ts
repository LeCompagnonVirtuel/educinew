'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDependencyEdgeService } from '../services/eduos-dependency-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { DependencyEdge } from '@educi/types';

export const useEduOSDependencyEdgeList = (schoolId: string) => {
  const [items, setItems] = useState<DependencyEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyEdgeService(supabase);
      const data = await service.listDependencyEdges(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
