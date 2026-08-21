'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntWorkflowEngineService } from '../services/workflow-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowEngine } from '@educi/types';

export const useEntWorkflowEngineList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntWorkflowEngineService(supabase);
      const data = await service.listWorkflowEngines(schoolId);
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
