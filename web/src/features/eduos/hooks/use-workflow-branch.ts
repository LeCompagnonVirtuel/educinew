'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowBranchService } from '../services/eduos-workflow-branch.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowBranch } from '@educi/types';

export const useEduOSWorkflowBranchList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowBranch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowBranchService(supabase);
      const data = await service.listWorkflowBranchs(schoolId);
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
