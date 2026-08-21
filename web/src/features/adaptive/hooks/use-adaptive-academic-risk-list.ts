'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveAcademicRiskService } from '../services/adaptive-academic-risk.service';
import { createClient } from '@/lib/supabase/client';
import type { AcademicRisk } from '@educi/types';

export const useAdaptiveAcademicRiskList = (schoolId: string) => {
  const [items, setItems] = useState<AcademicRisk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAcademicRiskService(supabase);
      const data = await service.listAcademicRisks(schoolId);
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
