'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFirewallRuleService } from '../services/firewall-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { FirewallRule } from '@educi/types';

export const useEntFirewallRuleList = (schoolId: string) => {
  const [items, setItems] = useState<FirewallRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFirewallRuleService(supabase);
      const data = await service.listFirewallRules(schoolId);
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
