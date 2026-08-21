'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSHumanApprovalService } from '../services/eduos-human-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { HumanApproval } from '@educi/types';

export const useEduOSHumanApprovalList = (schoolId: string) => {
  const [items, setItems] = useState<HumanApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSHumanApprovalService(supabase);
      const data = await service.listHumanApprovals(schoolId);
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
