'use client';

import { useState, useCallback } from 'react';
import { EduOSDataStreamService } from '../services/eduos-data-stream.service';
import { createClient } from '@/lib/supabase/client';
import type { DataStream } from '@educi/types';

export const useEduOSDataStreamActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataStream): Promise<DataStream | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataStreamService(supabase);
      return await service.createDataStream(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataStream>): Promise<DataStream | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataStreamService(supabase);
      return await service.updateDataStream(schoolId, id, data);
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
      const service = new EduOSDataStreamService(supabase);
      await service.deleteDataStream(schoolId, id);
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