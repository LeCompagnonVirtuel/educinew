'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowRetryService } from '../services/eduos-workflow-retry.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowRetry } from '@educi/types';

export const useEduOSWorkflowRetryList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowRetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowRetryService(supabase);
      const data = await service.listWorkflowRetrys(schoolId);
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
