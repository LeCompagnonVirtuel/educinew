'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCICDJobService } from '../services/cicd-job.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDJob } from '@educi/types';

export const useEntCICDJobList = (schoolId: string) => {
  const [items, setItems] = useState<CICDJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDJobService(supabase);
      const data = await service.listCICDJobs(schoolId);
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
