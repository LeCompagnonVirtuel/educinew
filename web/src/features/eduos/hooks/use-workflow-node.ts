'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowNodeService } from '../services/eduos-workflow-node.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowNode } from '@educi/types';

export const useEduOSWorkflowNodeList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowNodeService(supabase);
      const data = await service.listWorkflowNodes(schoolId);
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
