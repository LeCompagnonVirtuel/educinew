'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningCheckService } from '../services/provisioning-check.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningCheck } from '@educi/types';

export const useEntProvisioningCheckList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningCheckService(supabase);
      const data = await service.listProvisioningChecks(schoolId);
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
