'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSKnowledgeGraphNodeService } from '../services/eduos-knowledge-graph-node.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeGraphNode } from '@educi/types';

export const useEduOSKnowledgeGraphNodeList = (schoolId: string) => {
  const [items, setItems] = useState<KnowledgeGraphNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSKnowledgeGraphNodeService(supabase);
      const data = await service.listKnowledgeGraphNodes(schoolId);
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