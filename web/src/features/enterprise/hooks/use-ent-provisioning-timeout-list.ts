'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningTimeoutService } from '../services/provisioning-timeout.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningTimeout } from '@educi/types';

export const useEntProvisioningTimeoutList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningTimeout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTimeoutService(supabase);
      const data = await service.listProvisioningTimeouts(schoolId);
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
