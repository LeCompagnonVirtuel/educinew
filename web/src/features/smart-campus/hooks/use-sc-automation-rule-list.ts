'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScAutomationRuleService } from '../services/sc-automation-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationRule } from '@educi/types';

export const useScAutomationRuleList = (schoolId: string) => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScAutomationRuleService(createClient());
      const data = await service.listRules(schoolId);
      setRules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  return { rules, loading, error, refresh: fetchRules };
};
