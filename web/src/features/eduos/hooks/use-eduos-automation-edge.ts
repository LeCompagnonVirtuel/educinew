'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationEdgeService } from '../services/eduos-automation-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationEdge } from '@educi/types';

export const useEduOSAutomationEdgeList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationEdgeService(supabase);
      const data = await service.listAutomationEdges(schoolId);
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