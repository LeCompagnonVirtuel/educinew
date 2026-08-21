'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformSegmentService } from '../services/platform-segment.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformSegment } from '@educi/types';

export const useEntPlatformSegmentList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformSegmentService(supabase);
      const data = await service.listPlatformSegments(schoolId);
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
