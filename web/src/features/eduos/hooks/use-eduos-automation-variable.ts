'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationVariableService } from '../services/eduos-automation-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationVariable } from '@educi/types';

export const useEduOSAutomationVariableList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationVariableService(supabase);
      const data = await service.listAutomationVariables(schoolId);
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