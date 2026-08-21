'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationNodeService } from '../services/eduos-automation-node.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationNode } from '@educi/types';

export const useEduOSAutomationNodeList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNodeService(supabase);
      const data = await service.listAutomationNodes(schoolId);
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