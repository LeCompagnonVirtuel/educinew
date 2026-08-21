'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPipelineVersionService } from '../services/pipeline-version.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineVersion } from '@educi/types';

export const useEntPipelineVersionList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineVersionService(supabase);
      const data = await service.listPipelineVersions(schoolId);
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
