'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningRollbackService } from '../services/provisioning-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningRollback } from '@educi/types';

export const useEntProvisioningRollbackList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningRollback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRollbackService(supabase);
      const data = await service.listProvisioningRollbacks(schoolId);
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
