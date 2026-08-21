'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineApprovalService } from '../services/pipeline-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineApproval } from '@educi/types';

export const useEntPipelineApprovalList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineApprovalService(supabase);
      const data = await service.listPipelineApprovals(schoolId);
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
