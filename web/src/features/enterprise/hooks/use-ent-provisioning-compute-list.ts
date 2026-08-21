'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningComputeService } from '../services/provisioning-compute.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningCompute } from '@educi/types';

export const useEntProvisioningComputeList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningCompute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningComputeService(supabase);
      const data = await service.listProvisioningComputes(schoolId);
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
