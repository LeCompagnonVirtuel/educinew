'use client';

import { useState, useCallback } from 'react';
import { IntKPIService } from '../services/int-kpi.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceKPI, IntelligenceKPICreate } from '@educi/types';

export const useIntKPIActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceKPICreate): Promise<IntelligenceKPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKPIService(supabase);
      return await service.createKPI(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceKPICreate>): Promise<IntelligenceKPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKPIService(supabase);
      return await service.updateKPI(schoolId, id, data);
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
      const service = new IntKPIService(supabase);
      await service.deleteKPI(schoolId, id);
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
