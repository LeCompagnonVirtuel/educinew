'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSScheduledWorkflowService } from '../services/eduos-scheduled-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { ScheduledWorkflow } from '@educi/types';

export const useEduOSScheduledWorkflowList = (schoolId: string) => {
  const [items, setItems] = useState<ScheduledWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScheduledWorkflowService(supabase);
      const data = await service.listScheduledWorkflows(schoolId);
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
