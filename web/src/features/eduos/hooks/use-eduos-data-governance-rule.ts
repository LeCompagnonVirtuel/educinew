'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDataGovernanceRuleService } from '../services/eduos-data-governance-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { DataGovernanceRule } from '@educi/types';

export const useEduOSDataGovernanceRuleList = (schoolId: string) => {
  const [items, setItems] = useState<DataGovernanceRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataGovernanceRuleService(supabase);
      const data = await service.listDataGovernanceRules(schoolId);
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