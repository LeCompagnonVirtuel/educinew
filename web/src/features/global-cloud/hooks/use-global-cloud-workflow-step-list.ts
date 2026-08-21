'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudWorkflowStepService } from '../services/global-cloud-workflow-step.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowStep } from '@educi/types';

export const useGlobalCloudWorkflowStepList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudWorkflowStepService(supabase);
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