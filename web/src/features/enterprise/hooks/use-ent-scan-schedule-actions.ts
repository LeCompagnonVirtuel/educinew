'use client';

import { useState, useCallback } from 'react';
import { EntScanScheduleService } from '../services/scan-schedule.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanSchedule, ScanScheduleCreate } from '@educi/types';

export const useEntScanScheduleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanScheduleCreate): Promise<ScanSchedule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanScheduleService(supabase);
      return await service.createScanSchedule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanScheduleCreate>): Promise<ScanSchedule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanScheduleService(supabase);
      return await service.updateScanSchedule(schoolId, id, data);
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
      const service = new EntScanScheduleService(supabase);
      await service.deleteScanSchedule(schoolId, id);
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
