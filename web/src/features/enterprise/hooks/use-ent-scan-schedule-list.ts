'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanScheduleService } from '../services/scan-schedule.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanSchedule } from '@educi/types';

export const useEntScanScheduleList = (schoolId: string) => {
  const [items, setItems] = useState<ScanSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanScheduleService(supabase);
      const data = await service.listScanSchedules(schoolId);
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
