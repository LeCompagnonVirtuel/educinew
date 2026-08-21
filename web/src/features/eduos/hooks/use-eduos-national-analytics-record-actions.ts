'use client';

import { useState, useCallback } from 'react';
import { EduOSNationalAnalyticsRecordService } from '../services/eduos-national-analytics-record.service';
import { createClient } from '@/lib/supabase/client';
import type { NationalAnalyticsRecord } from '@educi/types';

export const useEduOSNationalAnalyticsRecordActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalAnalyticsRecordService(supabase);
      return await service.createNationalAnalyticsRecord(schoolId, data as NationalAnalyticsRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NationalAnalyticsRecord>): Promise<NationalAnalyticsRecord | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNationalAnalyticsRecordService(supabase);
      return await service.updateNationalAnalyticsRecord(schoolId, id, data);
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
      const service = new EduOSNationalAnalyticsRecordService(supabase);
      await service.deleteNationalAnalyticsRecord(schoolId, id);
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
