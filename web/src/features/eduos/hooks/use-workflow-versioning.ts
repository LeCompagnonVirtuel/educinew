'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowVersioningService } from '../services/eduos-workflow-versioning.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowVersioning } from '@educi/types';

export const useEduOSWorkflowVersioningList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowVersioning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowVersioningService(supabase);
      const data = await service.listWorkflowVersionings(schoolId);
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
