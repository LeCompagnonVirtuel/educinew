'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowInstanceService } from '../services/eduos-workflow-instance.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowInstance } from '@educi/types';

export const useEduOSWorkflowInstanceList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowInstanceService(supabase);
      const data = await service.listWorkflowInstances(schoolId);
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
