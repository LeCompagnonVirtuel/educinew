'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowVariableService } from '../services/eduos-workflow-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowVariable } from '@educi/types';

export const useEduOSWorkflowVariableList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVariableService(supabase);
      const data = await service.listWorkflowVariables(schoolId);
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
