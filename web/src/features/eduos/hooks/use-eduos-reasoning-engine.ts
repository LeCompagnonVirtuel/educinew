'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSReasoningEngineService } from '../services/eduos-reasoning-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { ReasoningEngine } from '@educi/types';

export const useEduOSReasoningEngineList = (schoolId: string) => {
  const [items, setItems] = useState<ReasoningEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningEngineService(supabase);
      const data = await service.listReasoningEngines(schoolId);
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