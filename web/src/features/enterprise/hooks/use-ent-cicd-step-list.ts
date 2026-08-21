'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCICDStepService } from '../services/cicd-step.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDStep } from '@educi/types';

export const useEntCICDStepList = (schoolId: string) => {
  const [items, setItems] = useState<CICDStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStepService(supabase);
      const data = await service.listCICDSteps(schoolId);
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
