'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCICDLogService } from '../services/cicd-log.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDLog } from '@educi/types';

export const useEntCICDLogList = (schoolId: string) => {
  const [items, setItems] = useState<CICDLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDLogService(supabase);
      const data = await service.listCICDLogs(schoolId);
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
