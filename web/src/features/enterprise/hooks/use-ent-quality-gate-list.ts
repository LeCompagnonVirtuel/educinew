'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntQualityGateService } from '../services/quality-gate.service';
import { createClient } from '@/lib/supabase/client';
import type { QualityGate } from '@educi/types';

export const useEntQualityGateList = (schoolId: string) => {
  const [items, setItems] = useState<QualityGate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntQualityGateService(supabase);
      const data = await service.listQualityGates(schoolId);
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
