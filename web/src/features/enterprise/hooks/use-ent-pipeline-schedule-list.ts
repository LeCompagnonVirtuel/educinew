'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineScheduleService } from '../services/pipeline-schedule.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineSchedule } from '@educi/types';

export const useEntPipelineScheduleList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineScheduleService(supabase);
      const data = await service.listPipelineSchedules(schoolId);
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
