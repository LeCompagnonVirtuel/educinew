'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSStateTransitionService } from '../services/eduos-state-transition.service';
import { createClient } from '@/lib/supabase/client';
import type { StateTransition } from '@educi/types';

export const useEduOSStateTransitionList = (schoolId: string) => {
  const [items, setItems] = useState<StateTransition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateTransitionService(supabase);
      const data = await service.listStateTransitions(schoolId);
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
