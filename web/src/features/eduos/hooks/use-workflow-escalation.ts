'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowEscalationService } from '../services/eduos-workflow-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEscalation } from '@educi/types';

export const useEduOSWorkflowEscalationList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowEscalation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowEscalationService(supabase);
      const data = await service.listWorkflowEscalations(schoolId);
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
