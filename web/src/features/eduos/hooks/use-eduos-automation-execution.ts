'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationExecutionService } from '../services/eduos-automation-execution.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationExecution } from '@educi/types';

export const useEduOSAutomationExecutionList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationExecutionService(supabase);
      const data = await service.listAutomationExecutions(schoolId);
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