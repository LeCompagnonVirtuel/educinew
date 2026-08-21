'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSReasoningRuleService } from '../services/eduos-reasoning-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { ReasoningRule } from '@educi/types';

export const useEduOSReasoningRuleList = (schoolId: string) => {
  const [items, setItems] = useState<ReasoningRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSReasoningRuleService(supabase);
      const data = await service.listReasoningRules(schoolId);
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