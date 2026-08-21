'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSVisualWorkflowBuilderService } from '../services/eduos-visual-workflow-builder.service';
import { createClient } from '@/lib/supabase/client';
import type { VisualWorkflowBuilder } from '@educi/types';

export const useEduOSVisualWorkflowBuilderList = (schoolId: string) => {
  const [items, setItems] = useState<VisualWorkflowBuilder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVisualWorkflowBuilderService(supabase);
      const data = await service.listVisualWorkflowBuilders(schoolId);
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
