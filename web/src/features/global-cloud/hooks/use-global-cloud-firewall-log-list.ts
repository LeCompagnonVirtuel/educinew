'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFirewallLogService } from '../services/global-cloud-firewall-log.service';
import { createClient } from '@/lib/supabase/client';
import type { FirewallLog } from '@educi/types';

export const useGlobalCloudFirewallLogList = (schoolId: string) => {
  const [items, setItems] = useState<FirewallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFirewallLogService(supabase);
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