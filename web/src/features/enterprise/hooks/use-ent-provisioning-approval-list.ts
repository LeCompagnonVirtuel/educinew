'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningApprovalService } from '../services/provisioning-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningApproval } from '@educi/types';

export const useEntProvisioningApprovalList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningApprovalService(supabase);
      const data = await service.listProvisioningApprovals(schoolId);
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
