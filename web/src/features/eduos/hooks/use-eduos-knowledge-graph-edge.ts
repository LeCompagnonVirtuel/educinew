'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSKnowledgeGraphEdgeService } from '../services/eduos-knowledge-graph-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeGraphEdge } from '@educi/types';

export const useEduOSKnowledgeGraphEdgeList = (schoolId: string) => {
  const [items, setItems] = useState<KnowledgeGraphEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSKnowledgeGraphEdgeService(supabase);
      const data = await service.listKnowledgeGraphEdges(schoolId);
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