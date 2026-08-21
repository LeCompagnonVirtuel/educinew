'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDecisionEngineService } from '../services/eduos-decision-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { DecisionEngine } from '@educi/types';

export const useEduOSDecisionEngineList = (schoolId: string) => {
  const [items, setItems] = useState<DecisionEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionEngineService(supabase);
      const data = await service.listDecisionEngines(schoolId);
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