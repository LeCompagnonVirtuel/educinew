'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudAlertRuleService } from '../services/global-cloud-alert-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertRule } from '@educi/types';

export const useGlobalCloudAlertRuleList = (schoolId: string) => {
  const [items, setItems] = useState<AlertRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudAlertRuleService(supabase);
      const data = await service.list(schoolId);
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