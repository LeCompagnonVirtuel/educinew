'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineTemplateService } from '../services/pipeline-template.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineTemplate } from '@educi/types';

export const useEntPipelineTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineTemplateService(supabase);
      const data = await service.listPipelineTemplates(schoolId);
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
