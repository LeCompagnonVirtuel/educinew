'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataStreamService } from '../services/eduos-data-stream.service';
import { createClient } from '@/lib/supabase/client';
import type { DataStream } from '@educi/types';

export const useEduOSDataStreamList = (schoolId: string) => {
  const [items, setItems] = useState<DataStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataStreamService(supabase);
      const data = await service.listDataStreams(schoolId);
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