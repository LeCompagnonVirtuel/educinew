'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowRollbackService } from '../services/eduos-workflow-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowRollback } from '@educi/types';

export const useEduOSWorkflowRollbackList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowRollback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRollbackService(supabase);
      const data = await service.listWorkflowRollbacks(schoolId);
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
