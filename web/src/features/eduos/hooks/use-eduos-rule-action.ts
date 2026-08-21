'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRuleActionService } from '../services/eduos-rule-action.service';
import { createClient } from '@/lib/supabase/client';
import type { RuleAction } from '@educi/types';

export const useEduOSRuleActionList = (schoolId: string) => {
  const [items, setItems] = useState<RuleAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleActionService(supabase);
      const data = await service.listRuleActions(schoolId);
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