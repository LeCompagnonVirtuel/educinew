'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSNationalAnalyticsRecordService } from '../services/eduos-national-analytics-record.service';
import { createClient } from '@/lib/supabase/client';
import type { NationalAnalyticsRecord } from '@educi/types';

export const useEduOSNationalAnalyticsRecordList = (schoolId: string) => {
  const [items, setItems] = useState<NationalAnalyticsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalAnalyticsRecordService(supabase);
      const data = await service.listNationalAnalyticsRecords(schoolId);
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
