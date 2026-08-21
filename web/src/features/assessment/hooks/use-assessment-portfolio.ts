'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentPortfolioService } from '../services/assessment-portfolio.service';
import { createClient } from '@/lib/supabase/client';
import type { Portfolio } from '@educi/types';

export const useAssessmentPortfolioList = (schoolId: string) => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPortfolioService(supabase);
      const data = await service.listPortfolios(schoolId);
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