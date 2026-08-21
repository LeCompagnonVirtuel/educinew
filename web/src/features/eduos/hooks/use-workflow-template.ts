'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSWorkflowTemplateService } from '../services/eduos-workflow-template.service';
import { createClient } from '@/lib/supabase/client';
import type { WorkflowTemplate } from '@educi/types';

export const useEduOSWorkflowTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSWorkflowTemplateService(supabase);
      const data = await service.listWorkflowTemplates(schoolId);
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
