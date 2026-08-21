'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSLowCodeWorkflowService } from '../services/eduos-low-code-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { LowCodeWorkflow } from '@educi/types';

export const useEduOSLowCodeWorkflowList = (schoolId: string) => {
  const [items, setItems] = useState<LowCodeWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLowCodeWorkflowService(supabase);
      const data = await service.listLowCodeWorkflows(schoolId);
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