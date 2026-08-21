'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCICDStageService } from '../services/cicd-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { CICDStage } from '@educi/types';

export const useEntCICDStageList = (schoolId: string) => {
  const [items, setItems] = useState<CICDStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCICDStageService(supabase);
      const data = await service.listCICDStages(schoolId);
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
