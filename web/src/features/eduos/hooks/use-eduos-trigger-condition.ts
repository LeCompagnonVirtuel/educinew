'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSTriggerConditionService } from '../services/eduos-trigger-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { TriggerCondition } from '@educi/types';

export const useEduOSTriggerConditionList = (schoolId: string) => {
  const [items, setItems] = useState<TriggerCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTriggerConditionService(supabase);
      const data = await service.listTriggerConditions(schoolId);
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