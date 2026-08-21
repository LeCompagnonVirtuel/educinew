'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudFirewallService } from '../services/global-cloud-cloud-firewall.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudFirewall } from '@educi/types';

export const useGlobalCloudCloudFirewallList = (schoolId: string) => {
  const [items, setItems] = useState<CloudFirewall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudFirewallService(supabase);
      const data = await service.list(schoolId);
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