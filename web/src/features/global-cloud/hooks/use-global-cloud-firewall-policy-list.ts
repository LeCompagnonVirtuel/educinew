'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFirewallPolicyService } from '../services/global-cloud-firewall-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { FirewallPolicy } from '@educi/types';

export const useGlobalCloudFirewallPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<FirewallPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFirewallPolicyService(supabase);
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