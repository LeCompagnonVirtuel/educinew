'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningLogService } from '../services/provisioning-log.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningLog } from '@educi/types';

export const useEntProvisioningLogList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningLogService(supabase);
      const data = await service.listProvisioningLogs(schoolId);
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
