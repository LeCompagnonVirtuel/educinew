'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudWorkflowRunService } from '../services/global-cloud-workflow-run.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowRun } from '@educi/types';

export const useGlobalCloudWorkflowRunList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudWorkflowRunService(supabase);
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