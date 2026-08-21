'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIdentityAccessLogService } from '../services/eduos-identity-access-log.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityAccessLog } from '@educi/types';

export const useEduOSIdentityAccessLogList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityAccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityAccessLogService(supabase);
      const data = await service.listIdentityAccessLogs(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
