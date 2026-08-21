'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineConfigService } from '../services/pipeline-config.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineConfig } from '@educi/types';

export const useEntPipelineConfigList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineConfigService(supabase);
      const data = await service.listPipelineConfigs(schoolId);
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
