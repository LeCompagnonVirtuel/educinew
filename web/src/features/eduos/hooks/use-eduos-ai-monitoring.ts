'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAIMonitoringService } from '../services/eduos-ai-monitoring.service';
import { createClient } from '@/lib/supabase/client';
import type { AIMonitoring } from '@educi/types';

export const useEduOSAIMonitoringList = (schoolId: string) => {
  const [items, setItems] = useState<AIMonitoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIMonitoringService(supabase);
      const data = await service.listAIMonitorings(schoolId);
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