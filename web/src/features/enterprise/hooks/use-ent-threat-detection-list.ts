'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntThreatDetectionService } from '../services/threat-detection.service';
import { createClient } from '@/lib/supabase/client';
import type { ThreatDetection } from '@educi/types';

export const useEntThreatDetectionList = (schoolId: string) => {
  const [items, setItems] = useState<ThreatDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntThreatDetectionService(supabase);
      const data = await service.listThreatDetections(schoolId);
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
