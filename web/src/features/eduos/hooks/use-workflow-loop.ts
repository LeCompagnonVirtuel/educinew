'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowLoopService } from '../services/eduos-workflow-loop.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowLoop } from '@educi/types';

export const useEduOSWorkflowLoopList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowLoop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowLoopService(supabase);
      const data = await service.listWorkflowLoops(schoolId);
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
