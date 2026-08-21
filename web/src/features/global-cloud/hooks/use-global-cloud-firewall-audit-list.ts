'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFirewallAuditService } from '../services/global-cloud-firewall-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { FirewallAudit } from '@educi/types';

export const useGlobalCloudFirewallAuditList = (schoolId: string) => {
  const [items, setItems] = useState<FirewallAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFirewallAuditService(supabase);
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