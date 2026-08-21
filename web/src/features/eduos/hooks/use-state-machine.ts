'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSStateMachineService } from '../services/eduos-state-machine.service';
import { createClient } from '@/lib/supabase/client';
import type { StateMachine } from '@educi/types';

export const useEduOSStateMachineList = (schoolId: string) => {
  const [items, setItems] = useState<StateMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateMachineService(supabase);
      const data = await service.listStateMachines(schoolId);
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
