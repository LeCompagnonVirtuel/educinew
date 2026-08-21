'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRuleConditionService } from '../services/eduos-rule-condition.service';
import { createClient } from '@/lib/supabase/client';
import type { RuleCondition } from '@educi/types';

export const useEduOSRuleConditionList = (schoolId: string) => {
  const [items, setItems] = useState<RuleCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuleConditionService(supabase);
      const data = await service.listRuleConditions(schoolId);
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