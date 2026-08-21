'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowSLAService } from '../services/eduos-workflow-sla.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowSLA } from '@educi/types';

export const useEduOSWorkflowSLAList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowSLA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowSLAService(supabase);
      const data = await service.listWorkflowSLAs(schoolId);
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
