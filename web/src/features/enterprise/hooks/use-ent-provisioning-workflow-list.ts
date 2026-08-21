'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningWorkflowService } from '../services/provisioning-workflow.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningWorkflow } from '@educi/types';

export const useEntProvisioningWorkflowList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningWorkflowService(supabase);
      const data = await service.listProvisioningWorkflows(schoolId);
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
