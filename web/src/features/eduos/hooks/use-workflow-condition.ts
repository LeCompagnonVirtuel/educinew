'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowConditionService } from '../services/eduos-workflow-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowCondition } from '@educi/types';

export const useEduOSWorkflowConditionList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowConditionService(supabase);
      const data = await service.listWorkflowConditions(schoolId);
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
