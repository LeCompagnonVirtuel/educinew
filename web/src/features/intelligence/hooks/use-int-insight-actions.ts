'use client';

import { useState, useCallback } from 'react';
import { IntInsightService } from '../services/int-insight.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceInsight, IntelligenceInsightCreate } from '@educi/types';

export const useIntInsightActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceInsightCreate): Promise<IntelligenceInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntInsightService(supabase);
      return await service.createInsight(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceInsightCreate>): Promise<IntelligenceInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntInsightService(supabase);
      return await service.updateInsight(schoolId, id, data);
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
      const service = new IntInsightService(supabase);
      await service.deleteInsight(schoolId, id);
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
