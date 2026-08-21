'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBusinessRuleService } from '../services/eduos-business-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { BusinessRule } from '@educi/types';

export const useEduOSBusinessRuleList = (schoolId: string) => {
  const [items, setItems] = useState<BusinessRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBusinessRuleService(supabase);
      const data = await service.listBusinessRules(schoolId);
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