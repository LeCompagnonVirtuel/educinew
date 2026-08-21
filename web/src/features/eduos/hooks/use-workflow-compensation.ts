'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowCompensationService } from '../services/eduos-workflow-compensation.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowCompensation } from '@educi/types';

export const useEduOSWorkflowCompensationList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowCompensation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowCompensationService(supabase);
      const data = await service.listWorkflowCompensations(schoolId);
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
