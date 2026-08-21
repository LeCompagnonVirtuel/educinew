'use client';

import { useState, useCallback } from 'react';
import { IntMonitoringService } from '../services/int-monitoring.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceMonitoring, IntelligenceMonitoringCreate } from '@educi/types';

export const useIntMonitoringActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceMonitoringCreate): Promise<IntelligenceMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntMonitoringService(supabase);
      return await service.createMonitoring(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceMonitoringCreate>): Promise<IntelligenceMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntMonitoringService(supabase);
      return await service.updateMonitoring(schoolId, id, data);
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
      const service = new IntMonitoringService(supabase);
      await service.deleteMonitoring(schoolId, id);
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