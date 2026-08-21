'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentWorkflowService } from '../services/incident-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentWorkflow } from '@educi/types';

export const useEntIncidentWorkflowList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentWorkflowService(supabase);
      const data = await service.listIncidentWorkflows(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
