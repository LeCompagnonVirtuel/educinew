'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudLogEntryService } from '../services/global-cloud-log-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { LogEntry } from '@educi/types';

export const useGlobalCloudLogEntryList = (schoolId: string) => {
  const [items, setItems] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudLogEntryService(supabase);
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