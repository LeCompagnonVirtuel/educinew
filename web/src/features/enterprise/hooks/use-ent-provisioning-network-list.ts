'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningNetworkService } from '../services/provisioning-network.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningNetwork } from '@educi/types';

export const useEntProvisioningNetworkList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningNetwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningNetworkService(supabase);
      const data = await service.listProvisioningNetworks(schoolId);
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
