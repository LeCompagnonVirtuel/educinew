'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineGateService } from '../services/pipeline-gate.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineGate } from '@educi/types';

export const useEntPipelineGateList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineGate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineGateService(supabase);
      const data = await service.listPipelineGates(schoolId);
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
