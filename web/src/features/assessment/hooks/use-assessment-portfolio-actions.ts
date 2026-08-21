'use client';

import { useState, useCallback } from 'react';
import { AssessmentPortfolioService } from '../services/assessment-portfolio.service';
import { createClient } from '@/lib/supabase/client';
import type { Portfolio, PortfolioCreate } from '@educi/types';

export const useAssessmentPortfolioActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PortfolioCreate): Promise<Portfolio | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPortfolioService(supabase);
      return await service.createPortfolio(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PortfolioCreate>): Promise<Portfolio | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPortfolioService(supabase);
      return await service.updatePortfolio(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPortfolioService(supabase);
      await service.deletePortfolio(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};