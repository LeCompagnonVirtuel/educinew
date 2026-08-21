'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSNoCodeWorkflowService } from '../services/eduos-no-code-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { NoCodeWorkflow } from '@educi/types';

export const useEduOSNoCodeWorkflowList = (schoolId: string) => {
  const [items, setItems] = useState<NoCodeWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeWorkflowService(supabase);
      const data = await service.listNoCodeWorkflows(schoolId);
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