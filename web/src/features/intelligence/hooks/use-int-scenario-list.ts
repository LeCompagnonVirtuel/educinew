'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntScenarioService } from '../services/int-scenario.service';
import { createClient } from '@/lib/supabase/client';
import type { Scenario } from '@educi/types';

export const useIntScenarioList = (schoolId: string) => {
  const [items, setItems] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntScenarioService(supabase);
      const data = await service.listScenarios(schoolId);
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