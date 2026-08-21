'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentApprovalService } from '../services/deployment-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentApproval } from '@educi/types';

export const useEntDeploymentApprovalList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentApprovalService(supabase);
      const data = await service.listDeploymentApprovals(schoolId);
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
