'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningRetryService } from '../services/provisioning-retry.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningRetry } from '@educi/types';

export const useEntProvisioningRetryList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningRetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningRetryService(supabase);
      const data = await service.listProvisioningRetrys(schoolId);
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
