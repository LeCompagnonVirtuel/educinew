'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanRuleService } from '../services/scan-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanRule } from '@educi/types';

export const useEntScanRuleList = (schoolId: string) => {
  const [items, setItems] = useState<ScanRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRuleService(supabase);
      const data = await service.listScanRules(schoolId);
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
