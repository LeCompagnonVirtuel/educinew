'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowEdgeService } from '../services/eduos-workflow-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEdge } from '@educi/types';

export const useEduOSWorkflowEdgeList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEdgeService(supabase);
      const data = await service.listWorkflowEdges(schoolId);
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
